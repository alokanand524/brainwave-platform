'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export function CreateRoomForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      type: formData.get('type'),
      maxMembers: parseInt(formData.get('maxMembers') as string),
      password: formData.get('password')
    }

    try {
      const response = await fetch('/api/study-rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (response.ok) {
        window.location.href = '/study-rooms'
      }
    } catch (error) {
      console.error('Failed to create room:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Study Room</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Room Title</Label>
            <Input id="title" name="title" required />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>
          
          <div>
            <Label htmlFor="type">Room Type</Label>
            <Select name="type" defaultValue="PUBLIC">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLIC">Public</SelectItem>
                <SelectItem value="PRIVATE">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="maxMembers">Max Members</Label>
            <Input id="maxMembers" name="maxMembers" type="number" defaultValue="50" />
          </div>
          
          <div>
            <Label htmlFor="password">Password (Optional)</Label>
            <Input id="password" name="password" type="password" />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Room'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}