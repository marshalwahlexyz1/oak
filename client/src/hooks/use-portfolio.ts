import { portfolioData } from "@/data/portfolio";
import { useToast } from "@/hooks/use-toast";

// Static data hooks - return data directly without API calls
export function useProfile() {
  return {
    data: portfolioData.profile,
    isLoading: false,
    isError: false,
  };
}

export function useEducation() {
  return {
    data: portfolioData.education,
    isLoading: false,
    isError: false,
  };
}

export function useExperience() {
  return {
    data: portfolioData.experience,
    isLoading: false,
    isError: false,
  };
}

export function useProjects() {
  return {
    data: portfolioData.projects,
    isLoading: false,
    isError: false,
  };
}

export function useSkills() {
  return {
    data: portfolioData.skills,
    isLoading: false,
    isError: false,
  };
}

// --- Contact Form ---
export function useContact() {
  const { toast } = useToast();
  
  return {
    mutate: (data: { name: string; email: string; message: string }, options?: { onSuccess?: () => void }) => {
      // Simple client-side validation
      if (!data.name || !data.email || !data.message) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      // Email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        toast({
          title: "Error",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      }

      // Show success message
      toast({
        title: "Message received",
        description: `Thank you ${data.name}! I'll reach out to you at ${data.email} soon.`,
      });

      options?.onSuccess?.();
    },
    isPending: false,
  };
}
