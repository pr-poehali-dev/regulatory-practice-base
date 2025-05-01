
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Practice {
  id: string;
  title: string;
  sphere: string;
  year: number;
  region: string;
  status: "published" | "pending" | "draft";
  lastUpdated: string;
}

// Демо-данные для кабинета пользователя
const USER_PRACTICES: Practice[] = [
  {
    id: "1",
    title: "Цифровизация процессов оценки регулирующего воздействия",
    sphere: "Цифровое развитие",
    year: 2024,
    region: "Москва",
    status: "published",
    lastUpdated: "15.04.2025",
  },
  {
    id: "2",
    title: "Внедрение интерактивных механизмов обратной связи",
    sphere: "Государственное управление",
    year: 2025,
    region: "Москва",
    status: "pending",
    lastUpdated: "01.05.2025",
  },
  {
    id: "3",
    title: "Оптимизация нормативной базы в сфере образования",
    sphere: "Образование",
    year: 2025,
    region: "Санкт-Петербург",
    status: "draft",
    lastUpdated: "30.04.2025",
  },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Фильтрация практик по статусу
  const filteredPractices = USER_PRACTICES.filter((practice) => {
    if (activeTab === "all") return true;
    return practice.status === activeTab;
  });

  // Статусные бейджи с соответствующими цветами
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-600">Опубликовано</Badge>;
      case "pending":
        return <Badge className="bg-yellow-600">На проверке</Badge>;
      case "draft":
        return <Badge className="bg-gray-500">Черновик</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">
            Личный кабинет пользователя
          </h1>
          <div className="flex gap-4">
            <Link to="/">
              <Button variant="outline">Вернуться на главную</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-medium">Мои практики</h2>
            <Button>
              <Icon name="PlusCircle" className="mr-2" size={18} />
              Создать новую практику
            </Button>
          </div>

          <Tabs defaultValue="all" className="p-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="draft">Черновики</TabsTrigger>
              <TabsTrigger value="pending">На проверке</TabsTrigger>
              <TabsTrigger value="published">Опубликованные</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Сфера</TableHead>
                    <TableHead>Год</TableHead>
                    <TableHead>Регион</TableHead>
                    <TableHead>Последнее обновление</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPractices.length > 0 ? (
                    filteredPractices.map((practice) => (
                      <TableRow key={practice.id}>
                        <TableCell className="font-medium">
                          {practice.title}
                        </TableCell>
                        <TableCell>{practice.sphere}</TableCell>
                        <TableCell>{practice.year}</TableCell>
                        <TableCell>{practice.region}</TableCell>
                        <TableCell>{practice.lastUpdated}</TableCell>
                        <TableCell>{getStatusBadge(practice.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {practice.status === "draft" && (
                              <>
                                <Button variant="outline" size="sm">
                                  <Icon name="Edit" size={16} className="mr-1" />
                                  Редактировать
                                </Button>
                                <Button variant="default" size="sm">
                                  <Icon name="Send" size={16} className="mr-1" />
                                  Отправить
                                </Button>
                              </>
                            )}
                            {practice.status === "pending" && (
                              <Button variant="outline" size="sm" disabled>
                                <Icon name="Clock" size={16} className="mr-1" />
                                Ожидает проверки
                              </Button>
                            )}
                            {practice.status === "published" && (
                              <Button variant="outline" size="sm">
                                <Icon name="FileText" size={16} className="mr-1" />
                                Просмотр
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        <div className="flex flex-col items-center gap-2">
                          <Icon name="FileX" size={32} className="text-gray-400" />
                          <span className="text-gray-500">
                            У вас нет практик в этой категории
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
