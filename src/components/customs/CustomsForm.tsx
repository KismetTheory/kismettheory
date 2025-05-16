
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// List of vibration bracelets
const vibeBracelets = [
  "Balance", "Calming", "Cleansing", "Connection", "Courage", 
  "Creativity", "Gratitude", "Grief", "Grounding", "Growth", 
  "Happiness", "Healing", "Joy", "Love", "Luck", "Motivation", 
  "Optimism", "Protection", "Prosperity", "Serenity", "Strength"
];

// Ring sizes
const ringSizes = Array.from({ length: 9 }, (_, i) => i + 5); // Generates [5, 6, 7, ..., 13]

// Form schemas
const energyFormSchema = z.object({
  vibeType: z.string().min(1, "Please select a vibe type"),
  itemType: z.string().min(1, "Please select an item type"),
  description: z.string().min(10, "Please enter at least 10 characters"),
  email: z.string().email("Please enter a valid email address")
});

const ringsFormSchema = z.object({
  ringSize: z.string().min(1, "Please select a ring size"),
  description: z.string().min(10, "Please enter at least 10 characters"),
  email: z.string().email("Please enter a valid email address")
});

const resinFormSchema = z.object({
  description: z.string().min(10, "Please enter at least 10 characters"),
  name: z.string().min(2, "Please enter your name"),
  contact: z.string().min(5, "Please provide your email or phone number")
});

interface CustomsFormProps {
  type: "energy" | "rings" | "resin";
}

const CustomsForm: React.FC<CustomsFormProps> = ({ type }) => {
  // Create the appropriate form based on the type
  const energyForm = useForm<z.infer<typeof energyFormSchema>>({
    resolver: zodResolver(energyFormSchema),
    defaultValues: {
      vibeType: "",
      itemType: "",
      description: "",
      email: ""
    },
  });

  const ringsForm = useForm<z.infer<typeof ringsFormSchema>>({
    resolver: zodResolver(ringsFormSchema),
    defaultValues: {
      ringSize: "",
      description: "",
      email: ""
    },
  });

  const resinForm = useForm<z.infer<typeof resinFormSchema>>({
    resolver: zodResolver(resinFormSchema),
    defaultValues: {
      description: "",
      name: "",
      contact: ""
    },
  });

  const sendEmail = async (formData: any, subject: string) => {
    try {
      // In a real application, we would use an API endpoint to send emails
      // For now, we'll just log the data and show a success toast
      console.log("Form submitted:", formData);
      console.log("Would send email to kismeticcrew@gmail.com");
      console.log("Subject:", subject);
      
      toast.success("Custom request submitted successfully!", {
        description: "We'll get back to you soon.",
      });
      
      // Reset the form
      if (type === "energy") energyForm.reset();
      if (type === "rings") ringsForm.reset();
      if (type === "resin") resinForm.reset();
      
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to submit request", {
        description: "Please try again or contact us directly.",
      });
      return false;
    }
  };

  const onEnergySubmit = async (data: z.infer<typeof energyFormSchema>) => {
    const subject = `Custom Energy Request - ${data.vibeType} ${data.itemType}`;
    await sendEmail(data, subject);
  };

  const onRingsSubmit = async (data: z.infer<typeof ringsFormSchema>) => {
    const subject = `Custom Ring Request - Size ${data.ringSize}`;
    await sendEmail(data, subject);
  };

  const onResinSubmit = async (data: z.infer<typeof resinFormSchema>) => {
    const subject = `Custom Resin Project Request`;
    await sendEmail(data, subject);
  };

  // Render the appropriate form based on the type
  if (type === "energy") {
    return (
      <Form {...energyForm}>
        <form onSubmit={energyForm.handleSubmit(onEnergySubmit)} className="space-y-6">
          <FormField
            control={energyForm.control}
            name="vibeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a Vibe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a vibe for your energy piece" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vibeBracelets.map((vibe) => (
                      <SelectItem key={vibe} value={vibe}>{vibe}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={energyForm.control}
            name="itemType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose an item type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bracelet">Bracelet</SelectItem>
                    <SelectItem value="pendant">Pendant</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={energyForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Vision</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe what you were thinking for your custom piece..." 
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={energyForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">Submit Energy Request</Button>
        </form>
      </Form>
    );
  } else if (type === "rings") {
    return (
      <Form {...ringsForm}>
        <form onSubmit={ringsForm.handleSubmit(onRingsSubmit)} className="space-y-6">
          <FormField
            control={ringsForm.control}
            name="ringSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ring Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your ring size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ringSizes.map((size) => (
                      <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={ringsForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Ring Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us which ring you'd like and any specific details..." 
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={ringsForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">Submit Ring Request</Button>
        </form>
      </Form>
    );
  } else {
    // Resin form
    return (
      <Form {...resinForm}>
        <form onSubmit={resinForm.handleSubmit(onResinSubmit)} className="space-y-6">
          <FormField
            control={resinForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Resin Project Ideas</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the resin project you're envisioning..." 
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={resinForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={resinForm.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="How can we contact you?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">Submit Resin Project Request</Button>
        </form>
      </Form>
    );
  }
};

export default CustomsForm;
