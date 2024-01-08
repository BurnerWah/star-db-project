import { RequireAdmin } from '@/components/auth'
import {
  TypographyH2,
  TypographyH3,
  TypographyInlineCode,
} from '@/components/typography'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type Control } from 'react-hook-form'
import { z } from 'zod'
import { OBJECT_TYPES } from '~shared/schemas'
import { useAppDispatch } from '../hooks/redux'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  type: OBJECT_TYPES,
  right_ascension: z.optional(
    z.object({
      hours: z.optional(z.coerce.number().min(0).max(23)),
      min: z.optional(z.coerce.number().min(0).max(59)),
      sec: z.optional(z.coerce.number().min(0).max(59)),
    }),
  ),
  declination: z.optional(
    z.object({
      degrees: z.optional(z.coerce.number().min(-90).max(90)),
      arcmin: z.optional(z.coerce.number().min(0).max(59)),
      arcsec: z.optional(z.coerce.number().min(0).max(59)),
    }),
  ),
  distance: z.optional(
    z.object({
      value: z.optional(z.coerce.number().min(0)),
      error: z.optional(z.coerce.number().min(0)),
    }),
  ),
  apparent_magnitude: z.optional(z.coerce.number()),
  absolute_magnitude: z.optional(z.coerce.number()),
  mass: z.optional(z.coerce.number().min(0)),
  redshift: z.optional(z.coerce.number().min(0)),
  nasa_image_id: z.optional(z.string()),
})

export default function AddItem() {
  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    toast({
      title: 'Submitted',
      description: (
        <TypographyInlineCode>
          {JSON.stringify(values, null, 2)}
        </TypographyInlineCode>
      ),
    })
    dispatch({ type: 'api/admin/addItem', payload: values })
    form.reset()
  }

  return (
    <div className="container">
      <TypographyH2>Add Item</TypographyH2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <MainInputs control={form.control} />
          <RightAscensionInputs control={form.control} />
          <DeclinationInputs control={form.control} />
          <DistanceInputs control={form.control} />
          <OtherInputs control={form.control} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

type SectionProps = Readonly<{ control: Control<z.infer<typeof formSchema>> }>

function MainInputs({ control }: SectionProps) {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>Enter the name of the object.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an object type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={OBJECT_TYPES.enum.Star}>Star</SelectItem>
                <SelectItem value={OBJECT_TYPES.enum.Planet}>Planet</SelectItem>
                <SelectItem value={OBJECT_TYPES.enum.Galaxy}>Galaxy</SelectItem>
                <SelectItem value={OBJECT_TYPES.enum.Nebula}>Nebula</SelectItem>
                <SelectItem value={OBJECT_TYPES.enum.Cluster}>
                  Cluster
                </SelectItem>
                <SelectItem value={OBJECT_TYPES.enum['Black Hole']}>
                  Black Hole
                </SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Choose the type of object you are adding.
            </FormDescription>
          </FormItem>
        )}
      />
    </>
  )
}

function RightAscensionInputs({ control }: SectionProps) {
  return (
    <>
      <TypographyH3>Right Ascension</TypographyH3>
      <FormField
        control={control}
        name="right_ascension.hours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hours</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="right_ascension.min"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minutes</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="right_ascension.sec"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Seconds</FormLabel>
            <FormControl>
              <Input type="number" step="0.0001" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}

function DeclinationInputs({ control }: SectionProps) {
  return (
    <>
      <TypographyH3>Declination</TypographyH3>
      <FormField
        control={control}
        name="declination.degrees"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degrees</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="declination.arcmin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Arc minutes</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="declination.arcsec"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Arc seconds</FormLabel>
            <FormControl>
              <Input type="number" step="0.0001" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}

function DistanceInputs({ control }: SectionProps) {
  return (
    <>
      <TypographyH3>Distance</TypographyH3>
      <FormField
        control={control}
        name="distance.value"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Distance in Light Years</FormLabel>
            <FormControl>
              <Input type="number" step="0.0001" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="distance.error"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Margin of error</FormLabel>
            <FormControl>
              <Input type="number" step="0.0001" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}

function OtherInputs({ control }: SectionProps) {
  return (
    <>
      <TypographyH3>Other</TypographyH3>
      <FormField
        control={control}
        name="apparent_magnitude"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Apparent Magnitude</FormLabel>
            <FormControl>
              <Input type="number" step="0.0001" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="absolute_magnitude"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Absolute Magnitude</FormLabel>
            <FormControl>
              <Input type="number" step="0.0001" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="mass"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mass</FormLabel>
            <FormControl>
              <Input type="number" step="0.0001" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="redshift"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Redshift</FormLabel>
            <FormControl>
              <Input type="number" step="0.0001" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="nasa_image_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>NASA Image ID</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}

// For lazy-loading
export function Component() {
  return (
    <RequireAdmin>
      <AddItem />
    </RequireAdmin>
  )
}
