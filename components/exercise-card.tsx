"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ExerciseCardProps {
  name: string
  muscle: string
  equipment: string
  difficulty: string
}

export function ExerciseCard({ name, muscle, equipment, difficulty }: ExerciseCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Card className="overflow-hidden bg-background/40 backdrop-blur-sm border-background/20">
        <div className="relative h-40 w-full">
          <Image src={`/placeholder.svg?height=160&width=320&text=${name}`} alt={name} fill className="object-cover" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{muscle}</Badge>
            <Badge variant="outline">{equipment}</Badge>
            <Badge
              variant="outline"
              className={
                difficulty === "Beginner"
                  ? "border-green-500 text-green-500"
                  : difficulty === "Intermediate"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-red-500 text-red-500"
              }
            >
              {difficulty}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button variant="ghost" size="sm">
            Details
          </Button>
          <Button variant="outline" size="sm">
            Add to Workout
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

