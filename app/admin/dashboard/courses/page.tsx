"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  BookOpen,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

// Mock data for courses
const mockCourses = [
  {
    id: "1",
    title: "JEE Advanced Complete Course",
    subtitle: "Comprehensive preparation for JEE Advanced",
    thumbnail: "/placeholder.svg?height=100&width=200",
    difficultyLevel: "ADVANCED",
    duration: "12 months",
    price: 12999,
    category: "JEE",
    enrolledStudents: 245,
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "NEET Complete Course",
    subtitle: "Complete preparation for NEET examination",
    thumbnail: "/placeholder.svg?height=100&width=200",
    difficultyLevel: "ADVANCED",
    duration: "12 months",
    price: 14999,
    category: "NEET",
    enrolledStudents: 312,
    createdAt: "2023-01-10T14:20:00Z",
  },
  {
    id: "3",
    title: "Physics Crash Course",
    subtitle: "Quick revision for competitive exams",
    thumbnail: "/placeholder.svg?height=100&width=200",
    difficultyLevel: "MODERATE",
    duration: "3 months",
    price: 4999,
    category: "CRASH_COURSES",
    enrolledStudents: 178,
    createdAt: "2023-02-05T09:15:00Z",
  },
  {
    id: "4",
    title: "Mathematics Foundation",
    subtitle: "Build strong fundamentals in mathematics",
    thumbnail: "/placeholder.svg?height=100&width=200",
    difficultyLevel: "BEGINNER",
    duration: "6 months",
    price: 3999,
    category: "OTHER",
    enrolledStudents: 156,
    createdAt: "2023-02-15T11:45:00Z",
  },
  {
    id: "5",
    title: "Chemistry Mastery",
    subtitle: "Master all concepts in chemistry",
    thumbnail: "/placeholder.svg?height=100&width=200",
    difficultyLevel: "MODERATE",
    duration: "6 months",
    price: 5999,
    category: "OTHER",
    enrolledStudents: 134,
    createdAt: "2023-03-01T16:30:00Z",
  },
  {
    id: "6",
    title: "Biology Crash Course",
    subtitle: "Quick revision for NEET and other exams",
    thumbnail: "/placeholder.svg?height=100&width=200",
    difficultyLevel: "MODERATE",
    duration: "3 months",
    price: 4499,
    category: "CRASH_COURSES",
    enrolledStudents: 98,
    createdAt: "2023-03-10T13:10:00Z",
  },
  {
    id: "7",
    title: "JEE Mains Crash Course",
    subtitle: "Last minute preparation for JEE Mains",
    thumbnail: "/placeholder.svg?height=100&width=200",
    difficultyLevel: "MODERATE",
    duration: "2 months",
    price: 9999,
    category: "CRASH_COURSES",
    enrolledStudents: 210,
    createdAt: "2023-03-20T10:00:00Z",
  },
];

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  // Filter courses based on search query and category
  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Manage your educational courses
          </p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 dark:text-white">
          <Link href="/admin/dashboard/courses/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCourses.reduce(
                (sum, course) => sum + course.enrolledStudents,
                0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Enrolled in all courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-blue-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                mockCourses.reduce((sum, course) => sum + course.price, 0) /
                  mockCourses.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">Per course</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue Potential
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-blue-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                mockCourses.reduce(
                  (sum, course) => sum + course.price * course.enrolledStudents,
                  0
                )
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Total value of enrollments
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Manage your educational courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="JEE">JEE</SelectItem>
                <SelectItem value="NEET">NEET</SelectItem>
                <SelectItem value="CRASH_COURSES">Crash Courses</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    <div className="flex items-center gap-1">
                      Course Name
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {course.subtitle}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          course.category === "JEE"
                            ? "border-blue-200 bg-blue-50 text-blue-700"
                            : course.category === "NEET"
                            ? "border-green-200 bg-green-50 text-green-700"
                            : course.category === "CRASH_COURSES"
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-purple-200 bg-purple-50 text-purple-700"
                        }`}
                      >
                        {course.category.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          course.difficultyLevel === "BEGINNER"
                            ? "border-green-200 bg-green-50 text-green-700"
                            : course.difficultyLevel === "MODERATE"
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-red-200 bg-red-50 text-red-700"
                        }`}
                      >
                        {course.difficultyLevel.charAt(0) +
                          course.difficultyLevel.slice(1).toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell>{formatCurrency(course.price)}</TableCell>
                    <TableCell>{course.enrolledStudents}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/admin/dashboard/courses/${course.id}/view`
                              )
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/admin/dashboard/courses/${course.id}/edit`
                              )
                            }
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredCourses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No courses found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
