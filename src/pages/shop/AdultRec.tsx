
import React from "react";
import CategoryLayout from "@/components/shop/CategoryLayout";
import { Card, CardContent } from "@/components/ui/card";

const AdultRec: React.FC = () => {
  return (
    <CategoryLayout title="Adult Recreation">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p className="text-lg">
          Browse our collection of adult recreation products. All items are for adults 21 and over.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">Product 1</h3>
            <p>Coming soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">Product 2</h3>
            <p>Coming soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">Product 3</h3>
            <p>Coming soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">Product 4</h3>
            <p>Coming soon</p>
          </CardContent>
        </Card>
      </div>
    </CategoryLayout>
  );
};

export default AdultRec;
