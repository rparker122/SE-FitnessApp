"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Dumbbell, Home, LineChart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedBackground } from "@/components/animated-background"
import { WorkoutCard } from "@/components/workout-card"
import { ExerciseCard } from "@/components/exercise-card"
import { ProgressChart } from "@/components/progress-chart"
import { WorkoutEditor } from "@/components/workout-editor"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isEditing, setIsEditing] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState({
    title: "",
    description: "",
    duration: "45 min",
    exercises: [],
  })
  const [workouts, setWorkouts] = useState([
    {
      id: "1",
      title: "Upper Body",
      description: "Chest, shoulders, and triceps",
      duration: "45 min",
      exercises: [
        { id: "e1", name: "Bench Press", sets: 3, reps: 10, weight: 135, restTime: 60 },
        { id: "e2", name: "Shoulder Press", sets: 3, reps: 10, weight: 95, restTime: 60 },
        { id: "e3", name: "Tricep Extension", sets: 3, reps: 12, weight: 50, restTime: 45 },
      ],
    },
    {
      id: "2",
      title: "Lower Body",
      description: "Quads, hamstrings, and calves",
      duration: "50 min",
      exercises: [
        { id: "e4", name: "Squat", sets: 4, reps: 8, weight: 185, restTime: 90 },
        { id: "e5", name: "Leg Press", sets: 3, reps: 12, weight: 225, restTime: 60 },
        { id: "e6", name: "Calf Raises", sets: 3, reps: 15, weight: 100, restTime: 45 },
      ],
    },
    {
      id: "3",
      title: "Core Strength",
      description: "Abs and lower back",
      duration: "30 min",
      exercises: [
        { id: "e7", name: "Plank", sets: 3, reps: 1, weight: 0, restTime: 60 },
        { id: "e8", name: "Crunches", sets: 3, reps: 15, weight: 0, restTime: 45 },
        { id: "e9", name: "Russian Twists", sets: 3, reps: 20, weight: 10, restTime: 45 },
      ],
    },
  ])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <AnimatedBackground />

      <div className="relative z-10">
        <header className="border-b border-border/40 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">FitMotion</h1>
            </div>
            <Button variant="outline" className="backdrop-blur-sm bg-background/30">
              Sign In
            </Button>
          </div>
        </header>

        <main className="container py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-background/30 backdrop-blur-sm">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="exercises">Past Exercises</TabsTrigger> {/* renamed */}
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="bg-background/40 backdrop-blur-md border-background/20">
                  <CardHeader>
                    <CardTitle>Welcome back!</CardTitle>
                    <CardDescription>Track your fitness journey and achieve your goals.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <StatsCard icon={<Activity />} title="Active Streak" value="7 days" />
                      <StatsCard icon={<Dumbbell />} title="Workouts" value="12 this month" />
                      <StatsCard icon={<LineChart />} title="Progress" value="+15% strength" />
                      <StatsCard icon={<User />} title="Goals" value="2 achieved" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4">Recent Workouts</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <WorkoutCard
                    title="Upper Body"
                    description="Chest, shoulders, and triceps"
                    duration="45 min"
                    exercises={5}
                    date="Yesterday"
                  />
                  <WorkoutCard
                    title="Lower Body"
                    description="Quads, hamstrings, and calves"
                    duration="50 min"
                    exercises={6}
                    date="3 days ago"
                  />
                  <WorkoutCard
                    title="Core Strength"
                    description="Abs and lower back"
                    duration="30 min"
                    exercises={4}
                    date="5 days ago"
                  />
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="exercises" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center text-muted-foreground py-20">
                  No past exercises to display.
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="workouts" className="space-y-6">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <WorkoutEditor
                    initialWorkout={editingWorkout}
                    onSave={(workout) => {
                      if (editingWorkout.id) {
                        // Update existing workout
                        setWorkouts(workouts.map((w) => (w.id === editingWorkout.id ? workout : w)))
                      } else {
                        // Add new workout
                        setWorkouts([...workouts, { ...workout, id: Date.now().toString() }])
                      }
                      setIsEditing(false)
                      setEditingWorkout({ title: "", description: "", duration: "45 min", exercises: [] })
                    }}
                    onCancel={() => {
                      setIsEditing(false)
                      setEditingWorkout({ title: "", description: "", duration: "45 min", exercises: [] })
                    }}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-background/40 backdrop-blur-md border-background/20">
                      <CardHeader>
                        <CardTitle>Your Workouts</CardTitle>
                        <CardDescription>Manage and track your workout routines.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {workouts.map((workout) => (
                            <WorkoutCard
                              key={workout.id}
                              title={workout.title}
                              description={workout.description}
                              duration={workout.duration}
                              exercises={workout.exercises?.length || 0}
                              date="Weekly"
                              onEdit={() => {
                                setEditingWorkout(workout)
                                setIsEditing(true)
                              }}
                            />
                          ))}
                          <div className="flex items-center justify-center h-full min-h-[200px] rounded-lg border border-dashed border-border p-4">
                            <Button
                              variant="outline"
                              className="h-auto flex flex-col gap-2 p-6"
                              onClick={() => {
                                setEditingWorkout({ title: "", description: "", duration: "45 min", exercises: [] })
                                setIsEditing(true)
                              }}
                            >
                              <span className="text-2xl">+</span>
                              <span>Create New Workout</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="bg-background/40 backdrop-blur-md border-background/20">
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                    <CardDescription>Track your fitness improvements over time.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ProgressChart />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 border-t border-border/40 bg-background/30 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between">
            <NavButton
              icon={<Home />}
              label="Home"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <NavButton
              icon={<Dumbbell />}
              label="Past Exercises"
              active={activeTab === "exercises"}
              onClick={() => setActiveTab("exercises")}
            />
            <NavButton
              icon={<Activity />}
              label="Workouts"
              active={activeTab === "workouts"}
              onClick={() => setActiveTab("workouts")}
            />
            <NavButton
              icon={<LineChart />}
              label="Progress"
              active={activeTab === "progress"}
              onClick={() => setActiveTab("progress")}
            />
          </div>
        </nav>
      </div>
    </div>
  )
}

function StatsCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <Card className="bg-background/50">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/20 p-2 text-primary">{icon}</div>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  )
}
