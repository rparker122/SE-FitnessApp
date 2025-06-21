"use client"

import { motion } from "framer-motion"
import { Clock, Dumbbell } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WorkoutCardProps {
  title: string
  description: string
  duration: string
  exercises: number
  date: string
  onEdit?: () => void
}

export function WorkoutCard({ title, description, duration, exercises, date, onEdit }: WorkoutCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Card className="overflow-hidden bg-background/40 backdrop-blur-sm border-background/20">
        <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10 pb-2">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Dumbbell className="h-4 w-4" />
              <span>{exercises} exercises</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border/10 pt-4">
          <span className="text-xs text-muted-foreground">{date}</span>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                Edit
              </Button>
            )}
            {/* Start button removed */}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
