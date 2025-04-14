
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const ComingSoon = ({ title, description, icon }: ComingSoonProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
      {icon && <div className="text-primary mb-4">{icon}</div>}
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button asChild>
        <Link to="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
};

export default ComingSoon;
