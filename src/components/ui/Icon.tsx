
import React from "react";
import * as LucideIcons from "lucide-react";

type IconProps = {
  name: keyof typeof LucideIcons | string;
  color?: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
  fallback?: keyof typeof LucideIcons;
  onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({
  name,
  color,
  size = 24,
  className = "",
  strokeWidth = 2,
  fallback = "HelpCircle",
  onClick,
}) => {
  // Check if the icon exists in lucide-react
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] || 
                        LucideIcons[fallback as keyof typeof LucideIcons];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      color={color}
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      onClick={onClick}
    />
  );
};

export default Icon;
