
import React from "react";
import CategoryLayout from "@/components/shop/CategoryLayout";
import { Card, CardContent } from "@/components/ui/card";

const RecRoom = () => {
  return (
    <CategoryLayout title="The Rec Room">
      <Card className="border border-accent/20">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-lg text-muted-foreground">
              Our rec room collection will be available soon. Check back later for fun items for your recreational space.
            </p>
          </div>
        </CardContent>
      </Card>
    </CategoryLayout>
  );
};

export default RecRoom;
