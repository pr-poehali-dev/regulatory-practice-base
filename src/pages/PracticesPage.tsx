
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";

// Типы данных для практик
interface Practice {
  id: string;
  title: string;
  sphere: string;
  year: number;
  region: string;
  author: string;
  status: "published" | "pending" | "draft";
}

// Демо-данные для таблицы
const DEMO_PRACTICES: Practice[] = [
  {
    id: "1",
    title: "Цифровизация процессов оценки регулирующего воздействия",
    sphere: "Цифровое развитие",
    year: 2024,
    region: "Москва",
    author: "Иванов И.И.",
    status: "published",
  },
  {
    id: "2",
    title: "Общественные обсуждения нормативных актов онлайн",
    sphere: "Государственное управление",
    year: 2023,
    region: "Санкт-Петербург",
    author: "Петров П.П.",
    status: "published",
  },
  {
    id: "3",
    title: "Внедрение экологических норм в промышленное регулирование",
    sphere: "Экология",
    year: 2024,
    region: "Казань",
    author: "Сидоров С.С.",
    status: "published",
  },
  {
    id: "4",
    title: "Упрощение процедур для малого бизнеса",
    sphere: "Предпринимательство",
    year: 2022,
    region: "Новосибирск",
    author: "Кузнецова А.В.",
    status: "published",
  },
  {
    id: "5",
    title: "Стандартизация межведомственного взаимодействия",
    sphere: "Государственное управление",
    year: 2023,
    region: "Екатеринбург",
    author: "Смирнов Д.А.",
    status: "published",
  },
];

// Уникальные значения для фильтров
const spheres = [...new Set(DEMO_PRACTICES.map((practice) => practice.sphere))];
const years = [...new Set(DEMO_PRACTICES.map((practice) => practice.year))];
const regions = [...new Set(DEMO_PRACTICES.map((practice) => practice.region))];

const PracticesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSphere, setSelectedSphere] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  // Фильтрация практик
  const filteredPractices = DEMO_PRACTICES.filter((practice) => {
    const matchesSearch = practice.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSphere = selectedSphere ? practice.sphere === selectedSphere : true;
    const matchesYear = selectedYear ? practice.year === parseInt(selectedYear) : true;
    const matchesRegion = selectedRegion ? practice.region === selectedRegion : true;

    return matchesSearch && matchesSphere && matchesYear && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">
            База практик в сфере регулярной политики
          </h1>
          <div className="flex gap-4">
            <Link to="/user-dashboard">
              <Button variant="outline">Личный кабинет</Button>
            </Link>
            <Link to="/admin-dashboard">
              <Button variant="outline">Кабинет администратора</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* Фильтры */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-medium mb-4">Фильтры</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Поиск по названию"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedSphere} onValueChange={setSelectedSphere}>
                <SelectTrigger>
                  <SelectValue placeholder="Сфера регулирования" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все сферы</SelectItem>
                  {spheres.map((sphere) => (
                    <SelectItem key={sphere} value={sphere}>
                      {sphere}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Год" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все годы</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Регион" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все регионы</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Таблица практик */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-medium">Список практик</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Сфера регулирования</TableHead>
                <TableHead>Год</TableHead>
                <TableHead>Регион</TableHead>
                <TableHead>Автор</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPractices.length > 0 ? (
                filteredPractices.map((practice) => (
                  <TableRow key={practice.id}>
                    <TableCell className="font-medium">{practice.title}</TableCell>
                    <TableCell>{practice.sphere}</TableCell>
                    <TableCell>{practice.year}</TableCell>
                    <TableCell>{practice.region}</TableCell>
                    <TableCell>{practice.author}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Icon name="FileText" size={16} className="mr-1" />
                        Просмотр
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex flex-col items-center gap-2">
                      <Icon name="SearchX" size={32} className="text-gray-400" />
                      <span className="text-gray-500">
                        Практики не найдены. Попробуйте изменить параметры поиска.
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default PracticesPage;
