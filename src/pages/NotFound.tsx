
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <Icon name="FileQuestion" className="mx-auto mb-6 text-purple-700" size={64} />
        <h1 className="text-3xl font-bold mb-2">Страница не найдена</h1>
        <p className="text-gray-600 mb-6">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link to="/">
          <Button className="bg-purple-700 hover:bg-purple-800">
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
