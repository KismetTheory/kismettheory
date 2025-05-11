
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const DonationTracker: React.FC = () => {
  // This would typically be fetched from WordPress or a database
  const donationData = {
    totalDonated: 3750,
    goalAmount: 5000,
    recentDonors: [
      { name: "John Doe", amount: 100 },
      { name: "Sarah Smith", amount: 250 },
      { name: "Anonymous", amount: 50 },
      { name: "Emily Johnson", amount: 75 },
      { name: "Michael Brown", amount: 200 },
      { name: "The Wilson Family", amount: 500 },
    ]
  };

  const percentComplete = (donationData.totalDonated / donationData.goalAmount) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Donation Progress</h3>
          <div className="mb-4">
            <p className="text-sm mb-1">
              ${donationData.totalDonated.toLocaleString()} raised of ${donationData.goalAmount.toLocaleString()} goal
            </p>
            <div className="w-full bg-muted rounded-full h-4">
              <div 
                className="bg-accent h-4 rounded-full" 
                style={{ width: `${percentComplete}%` }}
                aria-valuenow={percentComplete}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-sm text-muted-foreground">
              Help us reach our goal to fund field trips for all Delmar Elementary students this year.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Thank You to Our Donors</h3>
          <ul className="space-y-3">
            {donationData.recentDonors.map((donor, index) => (
              <li key={index} className="flex justify-between items-center text-sm border-b border-muted pb-2">
                <span>{donor.name}</span>
                <span className="font-medium">${donor.amount}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationTracker;
