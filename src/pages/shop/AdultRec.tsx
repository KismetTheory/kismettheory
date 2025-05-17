
import React from "react";
import CategoryLayout from "@/components/shop/CategoryLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brush } from "lucide-react";

const AdultRec: React.FC = () => {
  return (
    <CategoryLayout title="Adult Recreation">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p className="text-lg">
          Browse our collection of adult recreation products. All items are for adults 21 and over.
        </p>
      </div>

      {/* Custom Options Section */}
      <Card className="border border-accent/20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brush className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold">Custom Adult Recreation Options</h2>
          </div>
          <p className="mb-6">
            We can create custom molds and many exciting color combinations for your adult recreational needs.
            Our team specializes in creating unique pieces tailored to your preferences.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/customs">Explore Custom Options</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

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
