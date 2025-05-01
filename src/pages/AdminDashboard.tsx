
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Типы данных для практик в кабинете администратора
interface Practice {
  id: string;
  title: string;
  sphere: string;
  year: number;
  region: string;
  author: string;
  status: "published" | "pending" | "rejected" | "draft";
  submissionDate: string;
}

// Демо-данные для кабинета администратора
const ADMIN_PRACTICES: Practice[] = [
  {
    id: "1",
    title: "Цифровизация процессов оценки регулирующего воздействия",
    sphere: "Цифровое развитие",
    year: 2024,
    region: "Москва",
    author: "Иванов И.И.",
    status: "published",
    submissionDate: "10.04.2025",
  },
  {
    id: "2",
    title: "Общественные обсуждения нормативных актов онлайн",
    sphere: "Государственное управление",
    year: 2023,
    region: "Санкт-Петербург",
    author: "Петров П.П.",
    status: "published",
    submissionDate: "20.03.2025",
  },
  {
    id: "3",
    title: "Внедрение экологических норм в промышленное регулирование",
    sphere: "Экология",
    year: 2024,
    region: "Казань",
    author: "Сидоров С.С.",
    status: "pending",
    submissionDate: "01.05.2025",
  },
  {
    id: "4",
    title: "Упрощение процедур для малого бизнеса",
    sphere: "Предпринимательство",
    year: 2022,
    region: "Новосибирск",
    author: "Кузнецова А.В.",
    status: "pending",
    submissionDate: "29.04.2025",
  },
  {
    id: "5",
    title: "Модернизация систем общественного контроля",
    sphere: "Гражданское общество",
    year: 2025,
    region: "Владивосток",
    author: "Николаев Н.Н.",
    status: "rejected",
    submissionDate: "15.04.2025",
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Фильтрация практик по статусу
  const filteredPractices = ADMIN_PRACTICES.filter((practice) => {
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
      case "rejected":
        return <Badge className="bg-red-600">Отклонено</Badge>;
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
            Кабинет администратора
          </h1>
          <div className="flex gap-4">
            <Link to="/">
              <Button variant="outline">Вернуться на главную</Button>
            </Link>
            <Button variant="outline">
              <Icon name="Download" size={18} className="mr-2" />
              Выгрузить базу данных
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-medium">Управление практиками</h2>
            <Button variant="outline">
              <Icon name="Settings" className="mr-2" size={18} />
              Управление справочниками
            </Button>
          </div>

          <Tabs defaultValue="all" className="p-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="pending">На проверке</TabsTrigger>
              <TabsTrigger value="published">Опубликованные</TabsTrigger>
              <TabsTrigger value="rejected">Отклоненные</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Сфера</TableHead>
                    <TableHead>Год</TableHead>
                    <TableHead>Регион</TableHead>
                    <TableHead>Автор</TableHead>
                    <TableHead>Дата подачи</TableHead>
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
                        <TableCell>{practice.author}</TableCell>
                        <TableCell>{practice.submissionDate}</TableCell>
                        <TableCell>{getStatusBadge(practice.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {practice.status === "pending" && (
                              <>
                                <Button variant="default" size="sm">
                                  <Icon name="Check" size={16} className="mr-1" />
                                  Опубликовать
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Icon name="X" size={16} className="mr-1" />
                                  Отклонить
                                </Button>
                              </>
                            )}
                            {practice.status === "published" && (
                              <>
                                <Button variant="outline" size="sm">
                                  <Icon name="FileText" size={16} className="mr-1" />
                                  Просмотр
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Icon name="Edit" size={16} className="mr-1" />
                                  Разрешить редактирование
                                </Button>
                              </>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Icon name="Trash2" size={16} className="mr-1" />
                                  Удалить
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Подтвердите удаление
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Вы действительно хотите удалить практику "{practice.title}"?
                                    Это действие невозможно отменить.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-600">
                                    Удалить
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
                        <div className="flex flex-col items-center gap-2">
                          <Icon name="FileX" size={32} className="text-gray-400" />
                          <span className="text-gray-500">
                            Нет практик в этой категории
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

export default AdminDashboard;
