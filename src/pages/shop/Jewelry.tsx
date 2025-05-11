
import React from "react";
import CategoryLayout from "@/components/shop/CategoryLayout";
import { Card, CardContent } from "@/components/ui/card";

const Jewelry = () => {
  return (
    <CategoryLayout title="Jewelry">
      <Card className="border border-accent/20">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-lg text-muted-foreground">
              Our jewelry collection will be available soon. Check back later for beautiful, handcrafted pieces.
            </p>
          </div>
        </CardContent>
      </Card>
    </CategoryLayout>
  );
};

export default Jewelry;
