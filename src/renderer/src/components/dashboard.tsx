import { useState } from 'react'
import { Plus, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Schema = {
  name: string
  data: Record<string, any>[]
}

export function Dashboard() {
  const [schemas, setSchemas] = useState<Schema[]>([])
  const [selectedSchema, setSelectedSchema] = useState<Schema | null>(null)
  const [newSchemaName, setNewSchemaName] = useState('')

  const addNewSchema = () => {
    if (newSchemaName) {
      setSchemas([...schemas, { name: newSchemaName, data: [] }])
      setNewSchemaName('')
    }
  }

  const selectSchema = (schema: Schema) => {
    setSelectedSchema(schema)
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-64 bg-white shadow-md'>
        <div className='p-4'>
          <Sheet>
            <SheetTrigger asChild>
              <Button className='w-full'>
                <Plus className='mr-2 h-4 w-4' /> Add New Schema
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Schema</SheetTitle>
              </SheetHeader>
              <div className='mt-4 space-y-4'>
                <Input
                  placeholder='Schema Name'
                  value={newSchemaName}
                  onChange={(e) => setNewSchemaName(e.target.value)}
                />
                <Button onClick={addNewSchema}>Add Schema</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className='mt-4'>
          {schemas.map((schema) => (
            <button
              key={schema.name}
              className='w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-200 focus:outline-none'
              onClick={() => selectSchema(schema)}>
              <Database className='inline-block mr-2 h-4 w-4' />
              {schema.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-8'>
        {selectedSchema ? (
          <div>
            <h2 className='text-2xl font-bold mb-4'>{selectedSchema.name}</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(selectedSchema.data[0] || {}).map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedSchema.data.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, cellIndex) => (
                      <TableCell key={cellIndex}>
                        {JSON.stringify(value)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className='text-center text-gray-500 mt-20'>
            Select a schema from the sidebar to view its data
          </div>
        )}
      </div>
    </div>
  )
}
