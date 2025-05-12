
import React from "react";
import CategoryLayout from "@/components/shop/CategoryLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DigitalMerch: React.FC = () => {
  return (
    <CategoryLayout title="Digital Merchandise">
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p className="text-lg">
          Explore our digital merchandise collection. From digital art to downloadable content, find unique digital products created by our artists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <div className="aspect-video bg-muted">
            <img 
              src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Digital Art" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-5">
            <h3 className="font-bold text-lg mb-2">Digital Art Collection</h3>
            <p className="text-sm mb-4">A collection of high-resolution digital art pieces ready to download.</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold">$19.99</span>
              <Button size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-video bg-muted">
            <img 
              src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Digital Template" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-5">
            <h3 className="font-bold text-lg mb-2">Premium Templates</h3>
            <p className="text-sm mb-4">Design templates for your digital projects.</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold">$24.99</span>
              <Button size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-video bg-muted">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Digital Resource" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-5">
            <h3 className="font-bold text-lg mb-2">Digital Resources Bundle</h3>
            <p className="text-sm mb-4">A comprehensive bundle of digital resources for creators.</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold">$39.99</span>
              <Button size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CategoryLayout>
  );
};

export default DigitalMerch;
