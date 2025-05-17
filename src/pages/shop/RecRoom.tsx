
import React from "react";
import CategoryLayout from "@/components/shop/CategoryLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brush } from "lucide-react";

const RecRoom = () => {
  return (
    <CategoryLayout title="The Rec Room">
      <Card className="border border-accent/20 mb-8">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-lg text-muted-foreground">
              Our rec room collection will be available soon. Check back later for fun items for your recreational space.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Custom Options Section */}
      <Card className="border border-accent/20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brush className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold">Custom Recreation Options</h2>
          </div>
          <p className="mb-6">
            We can also make custom molds and many many fun color combinations for your recreational needs. 
            Let us know what you're looking for, and we'll craft something unique for your space!
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/customs">Explore Custom Options</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </CategoryLayout>
  );
};

export default RecRoom;
