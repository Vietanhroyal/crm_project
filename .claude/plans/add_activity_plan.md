# Specification & Plan: Add Activity Functionality

We will implement the "Add Activity" feature on the Activities page (`/activities`). This includes creating an activity creation form, integrating a modal popup using the Radix UI Dialog system, and managing the activity list statefully.

---

## 1. Interaction & UI Design

### 1.1 Add Activity Dialog Trigger
The static **Add Activity** button at the top-right of `/activities` will open a centered overlay dialog.

### 1.2 Form Layout (`ActivityForm`)
We will create a clean, double-column form inside a modal panel:
- **Title (Input):** Subject or name of the task/activity.
- **Type (Select):** Select between:
  - Call (Phone icon)
  - Email (Mail icon)
  - Meeting (Calendar icon)
  - Task (Check Circle icon)
- **Due Date (Date Picker/Input):** Standard calendar input for task deadlines.
- **Status (Select):** Set initial task state (Pending, Completed, Overdue).
- **Description (Textarea):** Free text for background details.

---

## 2. Technical Specification & State Design

### 2.1 Component Props Interface
In `components/activities/activity-form.tsx`:
```typescript
interface ActivityFormProps {
  onClose: () => void;
  onSubmit: (activity: Omit<Activity, "id">) => void;
}
```

### 2.2 Page State Hook Implementation
We will convert the static activities import in `/activities/page.tsx` to a stateful react array:
```typescript
const [activityList, setActivityList] = useState<Activity[]>(activities);
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
```
When a new activity is submitted:
1. Generate a unique `id` (e.g. `Date.now().toString()`).
2. Prepend the new activity to `activityList` so it appears immediately at the top of the timeline.
3. Close the modal dialog.

---

## 3. Proposed Changes

### [NEW] [activity-form.tsx](file:///c:/workspace/Engineering/crm_project/components/activities/activity-form.tsx)
We will create the form layout following the design aesthetic of the existing forms (e.g. inputs with light gray borders, clean labels, high-contrast CTA buttons).

```tsx
import { useState } from "react";
import { Activity, ActivityType, ActivityStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ActivityForm({ onClose, onSubmit }: ActivityFormProps) {
  // state hooks
}
```

### [MODIFY] [page.tsx](file:///c:/workspace/Engineering/crm_project/app/(dashboard)/activities/page.tsx)
- Import `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` from `@/components/ui/dialog`.
- Import `ActivityForm` component.
- Switch activity data array to local React state.
- Bind the "Add Activity" click event to open the modal.

---

## 4. Verification Plan

### 4.1 TypeScript Safety
- Run checking utility `npx tsc --noEmit` to verify type compliance.

### 4.2 End-to-End Test Case
1. Navigate to `/activities`.
2. Click **Add Activity**. Verify the modal opens smoothly.
3. Leave title empty, click Submit -> verify client-side validation prevents submit.
4. Input details:
   - Title: *"Họp đàm phán hợp đồng ABC"*
   - Type: *Meeting*
   - Due Date: *2026-06-10*
   - Status: *Pending*
   - Description: *"Thảo luận kỹ hơn về điều khoản thanh toán"*
5. Click **Add Activity** to submit.
6. Verify the modal closes, and the new activity appears at the top of the activities feed with a Pending status and orange Meeting styling.
