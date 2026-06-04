"use client";

import { useState } from "react";
import { deals as initialDeals } from "@/lib/mock-data";
import { Deal, DealStage } from "@/types";
import { DEAL_STAGES } from "@/lib/constants";
import { PipelineBoard } from "@/components/deals/pipeline-board";
import { DealForm } from "@/components/deals/deal-form";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const handleEditDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setSelectedDeal(null);
  };

  const handleAddDeal = (newDeal: Deal) => {
    setDeals([...deals, newDeal]);
    handleCloseModal();
  };

  const handleUpdateDeal = (updatedDeal: Deal) => {
    setDeals(deals.map((d) => (d.id === updatedDeal.id ? updatedDeal : d)));
    handleCloseModal();
  };

  const handleDragEnd = (dealId: string, newStage: DealStage) => {
    setDeals(
      deals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-text-dark">Deals</h1>
          <p className="text-text-muted mt-1">Track and manage your sales pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button variant="cta" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Deal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedDeal ? "Edit Deal" : "Add New Deal"}
                </DialogTitle>
              </DialogHeader>
              <DealForm
                deal={selectedDeal}
                onClose={handleCloseModal}
                onSubmit={selectedDeal ? handleUpdateDeal : handleAddDeal}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <PipelineBoard deals={deals} onDragEnd={handleDragEnd} onEdit={handleEditDeal} />
    </div>
  );
}
