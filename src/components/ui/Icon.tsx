
import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  color?: string;
  size?: number;
  fallback?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  color,
  size = 24,
  fallback = "CircleAlert",
  ...props
}) => {
  // Проверяем, существует ли иконка с заданным именем
  const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] || 
                    LucideIcons[fallback as keyof typeof LucideIcons];

  // Если иконка не найдена, возвращаем запасной вариант или null
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found and fallback "${fallback}" also not found`);
    return null;
  }

  return <LucideIcon color={color} size={size} {...props} />;
};

export default Icon;
