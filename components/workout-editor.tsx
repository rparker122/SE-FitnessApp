"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Save, X, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight: number
  restTime: number
}

interface WorkoutEditorProps {
  initialWorkout?: {
    id?: string
    title: string
    description: string
    duration: string
    exercises: Exercise[]
  }
  onSave: (workout: any) => void
  onCancel: () => void
}

export function WorkoutEditor({
  initialWorkout = {
    title: "",
    description: "",
    duration: "45 min",
    exercises: [],
  },
  onSave,
  onCancel,
}: WorkoutEditorProps) {
  const [workout, setWorkout] = useState(initialWorkout)
  const [exerciseLibrary] = useState([
    { name: "Bench Press", muscle: "Chest", equipment: "Barbell", difficulty: "Intermediate" },
    { name: "Squat", muscle: "Legs", equipment: "Barbell", difficulty: "Intermediate" },
    { name: "Deadlift", muscle: "Back", equipment: "Barbell", difficulty: "Advanced" },
    { name: "Pull-up", muscle: "Back", equipment: "Body weight", difficulty: "Intermediate" },
    { name: "Push-up", muscle: "Chest", equipment: "Body weight", difficulty: "Beginner" },
    { name: "Plank", muscle: "Core", equipment: "Body weight", difficulty: "Beginner" },
    { name: "Bicep Curl", muscle: "Arms", equipment: "Dumbbell", difficulty: "Beginner" },
    { name: "Shoulder Press", muscle: "Shoulders", equipment: "Dumbbell", difficulty: "Intermediate" },
    { name: "Tricep Extension", muscle: "Arms", equipment: "Cable", difficulty: "Beginner" },
    { name: "Leg Press", muscle: "Legs", equipment: "Machine", difficulty: "Beginner" },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setWorkout({ ...workout, [name]: value })
  }

  const addExercise = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: 3,
      reps: 10,
      weight: 0,
      restTime: 60,
    }

    setWorkout({
      ...workout,
      exercises: [...workout.exercises, newExercise],
    })
  }

  const updateExercise = (id: string, field: keyof Exercise, value: any) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex)),
    })
  }

  const removeExercise = (id: string) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.filter((ex) => ex.id !== id),
    })
  }

  const moveExercise = (id: string, direction: "up" | "down") => {
    const index = workout.exercises.findIndex((ex) => ex.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === workout.exercises.length - 1)) {
      return
    }

    const newExercises = [...workout.exercises]
    const newIndex = direction === "up" ? index - 1 : index + 1

    // Swap exercises
    ;[newExercises[index], newExercises[newIndex]] = [newExercises[newIndex], newExercises[index]]

    setWorkout({
      ...workout,
      exercises: newExercises,
    })
  }

  const handleSave = () => {
    // Calculate estimated duration based on exercises
    let totalTime = 0
    workout.exercises.forEach((ex) => {
      // Time for all sets (including rest between sets)
      const setTime = ex.sets * (30 + ex.restTime) // 30 seconds per set + rest time
      totalTime += setTime
    })

    // Convert to minutes and round up
    const durationMinutes = Math.ceil(totalTime / 60)

    const updatedWorkout = {
      ...workout,
      duration: `${durationMinutes} min`,
    }

    onSave(updatedWorkout)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <Card className="bg-background/40 backdrop-blur-md border-background/20">
        <CardHeader>
          <CardTitle>{workout.id ? "Edit Workout" : "Create New Workout"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Workout Name</Label>
            <Input
              id="title"
              name="title"
              value={workout.title}
              onChange={handleInputChange}
              placeholder="e.g., Upper Body Strength"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={workout.description}
              onChange={handleInputChange}
              placeholder="Describe your workout..."
              className="bg-background/50"
            />
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-2">Exercises</h3>

            {workout.exercises.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-md border-border/50">
                <p className="text-muted-foreground">No exercises added yet</p>
                <p className="text-sm text-muted-foreground">Add exercises from the library below</p>
              </div>
            ) : (
              <div className="space-y-4">
                {workout.exercises.map((exercise, index) => (
                  <Card key={exercise.id} className="bg-background/30">
                    <CardHeader className="py-3 px-4 flex flex-row items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{index + 1}.</span>
                          <span className="font-medium">{exercise.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveExercise(exercise.id, "up")}
                          disabled={index === 0}
                          className="h-8 w-8"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveExercise(exercise.id, "down")}
                          disabled={index === workout.exercises.length - 1}
                          className="h-8 w-8"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExercise(exercise.id)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3 px-4">
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="space-y-1">
                          <Label htmlFor={`sets-${exercise.id}`} className="text-xs">
                            Sets
                          </Label>
                          <Input
                            id={`sets-${exercise.id}`}
                            type="number"
                            min="1"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(exercise.id, "sets", Number.parseInt(e.target.value))}
                            className="h-8"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`reps-${exercise.id}`} className="text-xs">
                            Reps
                          </Label>
                          <Input
                            id={`reps-${exercise.id}`}
                            type="number"
                            min="1"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(exercise.id, "reps", Number.parseInt(e.target.value))}
                            className="h-8"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`weight-${exercise.id}`} className="text-xs">
                            Weight (lbs)
                          </Label>
                          <Input
                            id={`weight-${exercise.id}`}
                            type="number"
                            min="0"
                            step="5"
                            value={exercise.weight}
                            onChange={(e) => updateExercise(exercise.id, "weight", Number.parseInt(e.target.value))}
                            className="h-8"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`rest-${exercise.id}`} className="text-xs">
                            Rest (sec)
                          </Label>
                          <Select
                            value={exercise.restTime.toString()}
                            onValueChange={(value) => updateExercise(exercise.id, "restTime", Number.parseInt(value))}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="Rest time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30s</SelectItem>
                              <SelectItem value="45">45s</SelectItem>
                              <SelectItem value="60">60s</SelectItem>
                              <SelectItem value="90">90s</SelectItem>
                              <SelectItem value="120">120s</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-2">Exercise Library</h3>
            <Accordion type="single" collapsible className="bg-background/30 rounded-md">
              <AccordionItem value="exercises">
                <AccordionTrigger className="px-4">Browse Exercises</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {exerciseLibrary.map((exercise) => (
                      <div
                        key={exercise.name}
                        className="flex justify-between items-center p-2 rounded-md hover:bg-background/50"
                      >
                        <div>
                          <div className="font-medium">{exercise.name}</div>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {exercise.muscle}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {exercise.equipment}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => addExercise(exercise.name)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Workout
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

