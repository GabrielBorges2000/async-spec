import { useState } from 'react'
import { Plus, Database, EllipsisVertical, Trash2, Eye, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { toast } from 'sonner'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Label } from '@/components/ui/label'
import { Separator } from './ui/separator'

type Schema = {
  name: string
  key: string
  // biome-ignore lint/suspicious/noExplicitAny: data types will depend on the actual schema to data base
  data: Record<string, any>[]
}

export function Dashboard() {
  const [schemas, setSchemas] = useState<Schema[]>([
    {
      name: 'Customers',
      key: 'users',
      data: [
        {
          id: '40056f31-ee6f-4dd1-ad51-fa584205bf63',
          name: 'Alessiane Meirelles Roberto Costa',
          email: 'Alessiane.meirelles@gmail.com',
          phone: '',
        },
        {
          id: '90576131-8ff2-41b9-bd4c-c2c0f3e59c0e',
          name: 'Ariane Gonçalves',
          email: 'goncalvesaryane15@gmail.com',
          phone: '(11) 95124-0721',
          teste: '(11) 95124-0721',
        },
        {
          id: '4a5eb9a4-c6e6-4322-b352-e4c6303e3993',
          name: 'Eliane',
          email: 'elianeribeiro296150@gmail.com',
          phone: '(94) 99304-9156',
        },
        {
          id: '26b90403-f0e4-4bed-9349-8105331bced0',
          name: 'Elisangela Alencar',
          email: 'elisangela.alencar@outlook.com.br',
          phone: null,
        },
        {
          id: '9b1ceefc-ab62-47c7-b103-b00ac33e6b08',
          name: 'Flavio Emanuel de Souza Santos',
          email: 'flaemanuelss@gmail.com',
          phone: null,
        },
        {
          id: 'd84bf028-1d06-460a-8cdc-9b797a32558d',
          name: 'Gabriel Borges Oliveira',
          email: 'gabriel.vscode@gmail.com',
          phone: null,
        },
        {
          id: 'ef0439bc-f784-49e3-bfb0-af32cfb39bf3',
          name: 'Nayla Karoline dos Santos Delfino ',
          email: 'naylanaylaenzoj@gmail.com',
          phone: '(11) 96437-5707',
        },
        {
          id: '6c03d0a8-7dbb-4966-b7cb-220931de7848',
          name: 'Vitória Souza Azevedo',
          email: 'vi.souzaazevedoo@gmail.com',
          phone: null,
        },
      ],
    },
  ])

  const [selectedSchema, setSelectedSchema] = useState<Schema | null>(null)
  const [newSchemaName, setNewSchemaName] = useState('')
  const [newKey, setNewKey] = useState('')

  const addNewSchema = () => {
    if (!newSchemaName || !newKey) {
      toast.info('Please fill in all fields.')
      return
    }

    const existingSchema = schemas.find((s) => s.name === newSchemaName)

    if (existingSchema) {
      toast.error('Schema name already exists.')
      return
    }

    setSchemas([...schemas, { name: newSchemaName, key: newKey, data: [] }])
    setNewSchemaName('')
    setNewKey('')

    toast.success('Schema created successfully.')
  }

  const selectSchema = (schema: Schema) => {
    setSelectedSchema(schema)
  }

  const removeSchema = (schema: string) => {
    const updatedSchemas = schemas.filter((s) => s.name !== schema)

    setSchemas(updatedSchemas)
    setSelectedSchema(null)
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-64 bg-white shadow-md h-screen'>
        <div className='p-4'>
          <Sheet>
            <SheetTrigger asChild>
              <Button className='w-full'>
                <Plus className='mr-2 h-4 w-4' /> Schema
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add new schema</SheetTitle>
              </SheetHeader>

              <Separator className='my-4' />

              <form className='mt-4 space-y-4'>
                <Label className='font-semibold'>
                  Database Name
                  <p className='font-normal text-zinc-500'>
                    Description menu name
                  </p>
                  <Input
                    placeholder='Database'
                    className='font-normal mt-2 mb-4'
                    value={newSchemaName}
                    onChange={(e) => setNewSchemaName(e.target.value)}
                  />
                </Label>
                <Label className='font-semibold'>
                  Key
                  <p className='font-normal text-zinc-500'>
                    Description menu name
                  </p>
                  <Input
                    placeholder='database:users'
                    value={newKey}
                    className='font-normal mt-2 mb-4'
                    onChange={(e) => setNewKey(e.target.value)}
                  />
                </Label>
                <Button type='button' onClick={addNewSchema}>
                  Add Schema
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
        <Separator />
        <div className='mt-4 px-2 space-y-2'>
          <h2 className='text-lg font-bold text-gray-700'>Databases</h2>
          {schemas.map((schema) => (
            <div key={schema.name} className='flex flex-row gap-1'>
              <Button
                variant={'ghost'}
                className='w-full flex flex-row gap-1 justify-start items-center font-normal'
                onClick={() => selectSchema(schema)}>
                <Database className='inline-block mr-2 h-4 w-4' />
                {schema.name}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    className='h-9 w-9'
                    onClick={() => selectSchema(schema)}>
                    <EllipsisVertical className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className='flex flex-row gap-2 items-center'
                    onClick={() => selectSchema(schema)}>
                    <Eye className='h-4 w-4' /> View data
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                    className='flex flex-row gap-2 items-center'
                    onClick={() => selectSchema(schema)}>
                    <Pencil className='h-4 w-4' /> Edit
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
                    className='flex flex-row gap-2 items-center text-red-500 hover:text-white hover:bg-red-500'
                    onClick={() => removeSchema(schema.name)}>
                    <Trash2 className='h-4 w-4' /> Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-8 max-h-screen overflow-y-auto'>
        {selectedSchema ? (
          <div>
            <h2 className='text-2xl font-bold mb-4'>{selectedSchema.name}</h2>
            <pre>{JSON.stringify(selectedSchema.data, null, 2)}</pre>

            {/* <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(selectedSchema.data[0] || {}).map((key) => (
                    <TableHead key={key} className='font-bold'>
                      {key.toUpperCase()}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className='overflow-y-auto'>
                {selectedSchema.data.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, cellIndex) => (
                      <TableCell key={cellIndex}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
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
