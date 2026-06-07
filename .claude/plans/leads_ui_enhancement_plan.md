# Specification & Plan: Lead Management UI Enhancement

We will enhance the leads page (`/leads`) with advanced filtering, sorting, quick filters, bulk actions, and export functionality. Currently, the Filter and Export buttons exist but are non-functional. This plan transforms the leads page into a powerful, interactive lead management interface.

---

## 1. User Experience & UI/UX Design

### 1.1 Enhanced Page Layout
```
+-----------------------------------------------------------+
| Leads                                  [Export] [+ Add]   |
| Manage and qualify your potential customers               |
+-----------------------------------------------------------+
| [Search...]                  [Filter (3)] [Quick v]      |
+-----------------------------------------------------------+
| [x] New  [x] Recent  [x] High Score     ← Active filters  |
+-----------------------------------------------------------+
| [x] | Lead      | Source | Status | Score | Date | ...    |
|-----|-----------|--------|--------|-------|------|-----|
| [x] | Nguyễn Văn| Website| New    | 75    | ...  | ...  |
| [x] | Trần Thị  | LinkedIn| Qual. | 90    | ...  | ...  |
+-----------------------------------------------------------+
| (Bulk Action Bar appears when checkboxes selected)        |
| [3 selected] [Delete] [Change Status v] [Reassign v]      |
+-----------------------------------------------------------+
```

### 1.2 Filter Popover (`LeadFilters`)
When clicking the **Filter** button, a popover dropdown appears with:

- **Status**: Multi-select checkboxes
  - New / Contacted / Qualified / Lost
- **Source**: Multi-select checkboxes
  - Website / Referral / LinkedIn / Cold Call / Facebook / Email Campaign
- **Date Range**: Two date inputs (From / To)
- **Assignee**: Single-select dropdown
- **Score Range**: Dual-handle slider (0-100)

Footer: `[Clear All]` and `[Apply Filters]` buttons. A badge on the Filter button shows the number of active filters.

### 1.3 Quick Filter Chips
Horizontal pills below the search bar:
- **All** (default - shows all leads)
- **New** (status = new)
- **Recent** (created within 7 days)
- **High Score** (score >= 70)
- **My Leads** (assignee = current user)

Active chip gets a filled background; others are outlined.

### 1.4 Sortable Columns
Each column header (Lead, Source, Status, Score, Date) becomes clickable with arrow icons (▲/▼) on the active sort column. Click cycles: none → asc → desc.

### 1.5 Bulk Actions Bar
Slides up from the bottom when 1+ rows are selected:
- Counter: "3 leads selected"
- Buttons: Delete / Change Status (dropdown) / Reassign (dropdown) / Clear Selection

### 1.6 Export Functionality
The Export button triggers a CSV download of the currently filtered list with all columns. Filename: `leads-export-YYYY-MM-DD.csv`.

---

## 2. Technical Design

### 2.1 Types and Interface Schema

In `types/index.ts`:
```typescript
export interface LeadFilters {
  status: LeadStatus[];
  source: string[];
  dateFrom: string;
  dateTo: string;
  assignee: string | "all";
  scoreMin: number;
  scoreMax: number;
}

export type QuickFilter = "all" | "new" | "recent" | "highScore" | "myLeads";

export type SortField = "name" | "source" | "status" | "score" | "createdAt";
export type SortDirection = "asc" | "desc";
```

### 2.2 Filter State Management
All filter state lives in the leads page component:
```typescript
const [filters, setFilters] = useState<LeadFilters>({
  status: [],
  source: [],
  dateFrom: "",
  dateTo: "",
  assignee: "all",
  scoreMin: 0,
  scoreMax: 100,
});
const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
const [sort, setSort] = useState<{ field: SortField; direction: SortDirection }>({
  field: "createdAt",
  direction: "desc",
});
const [selectedIds, setSelectedIds] = useState<string[]>([]);
```

### 2.3 Filter Logic
A `useMemo` hook combines search, filters, quick filter, and sort:
```typescript
const filteredLeads = useMemo(() => {
  let result = leads;
  
  // Search
  if (searchTerm) result = result.filter(/* ... */);
  
  // Quick filter
  if (quickFilter === "new") result = result.filter(l => l.status === "new");
  if (quickFilter === "recent") {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    result = result.filter(l => new Date(l.createdAt).getTime() > sevenDaysAgo);
  }
  if (quickFilter === "highScore") result = result.filter(l => l.score >= 70);
  
  // Advanced filters
  if (filters.status.length) result = result.filter(l => filters.status.includes(l.status));
  if (filters.source.length) result = result.filter(l => filters.source.includes(l.source));
  // ... etc
  
  // Sort
  result = [...result].sort((a, b) => {
    const aVal = a[sort.field];
    const bVal = b[sort.field];
    return sort.direction === "asc" 
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });
  
  return result;
}, [searchTerm, filters, quickFilter, sort]);
```

### 2.4 CSV Export
```typescript
const handleExport = () => {
  const headers = ["Name", "Company", "Email", "Phone", "Source", "Status", "Score", "Created At", "Assignee"];
  const rows = filteredLeads.map(l => [l.name, l.company, l.email, l.phone, l.source, l.status, l.score, l.createdAt, l.assignee]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-export-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
};
```

---

## 3. Proposed Changes

### [NEW] [lead-filters.tsx](file:///c:/workspace/Engineering/crm_project/components/leads/lead-filters.tsx)
A popover component containing all advanced filter controls. Uses Radix Popover or a custom dropdown. Includes:
- Multi-select checkboxes for status & source
- Date range inputs
- Assignee dropdown
- Score range slider
- Clear All / Apply buttons

### [NEW] [quick-filters.tsx](file:///c:/workspace/Engineering/crm_project/components/leads/quick-filters.tsx)
A horizontal pill button group for quick filter presets.

### [NEW] [bulk-actions.tsx](file:///c:/workspace/Engineering/crm_project/components/leads/bulk-actions.tsx)
A floating action bar that appears at the bottom when leads are selected. Provides bulk operations.

### [MODIFY] [lead-table.tsx](file:///c:/workspace/Engineering/crm_project/components/leads/lead-table.tsx)
- Add checkbox column
- Make column headers sortable
- Accept `selectedIds`, `onSelect`, `onSelectAll` props
- Accept `sort` and `onSortChange` props

### [MODIFY] [page.tsx](file:///c:/workspace/Engineering/crm_project/app/(dashboard)/leads/page.tsx)
- Add filter, sort, selection state
- Connect Export button to CSV export
- Connect Filter button to open popover
- Render `QuickFilters` and `BulkActions` components
- Pass sort/selection handlers to `LeadTable`

### [MODIFY] [types/index.ts](file:///c:/workspace/Engineering/crm_project/types/index.ts)
Add new interfaces: `LeadFilters`, `QuickFilter`, `SortField`, `SortDirection`.

---

## 4. Verification Plan

### 4.1 Automated Validation
- Run `npx tsc --noEmit` to verify TypeScript types.
- Run `npm run lint` to check code style.

### 4.2 Manual Test Scenarios
1. **Filter Functionality**
   - Click Filter button → popover opens.
   - Select "Qualified" status + "Website" source → click Apply.
   - Verify only matching leads appear, badge shows "2" on Filter button.
   - Click "Clear All" → all filters reset.

2. **Quick Filters**
   - Click "Recent" → only leads from last 7 days shown.
   - Click "High Score" → only leads with score >= 70 shown.
   - Click "All" → full list restored.

3. **Sorting**
   - Click "Score" column header → sort asc.
   - Click again → sort desc.
   - Click "Date" → sort by newest first.

4. **Bulk Actions**
   - Check 3 checkboxes → bulk action bar appears.
   - Click "Change Status" → select "Qualified" → verify 3 leads updated.
   - Click "Delete" → confirm → 3 leads removed.

5. **Export**
   - Apply a filter (e.g., status = qualified).
   - Click Export → verify CSV downloads with only filtered leads.
   - Open CSV → verify all columns present.

6. **Combined Filters**
   - Type "Nguyễn" in search + apply "New" status filter + sort by Score desc.
   - Verify the result is a single lead matching all criteria.
