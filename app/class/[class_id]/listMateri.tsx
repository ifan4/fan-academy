import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { textTrunc } from "@/lib/helper"
import { materi } from "@/types/interfaces"
  

  
export default function ListMateri({materis}:{materis:materi[]}) {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="lg:w-[400px]">Title</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materis?.map((materi: materi) => (
            <TableRow key={materi.id}>
              <TableCell className="font-medium">{materi.title}</TableCell>
              <TableCell>{textTrunc(materi.description,200)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  