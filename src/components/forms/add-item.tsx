import { TypographyH3, TypographyInlineCode } from '@/components/typography'
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
import { useAppDispatch } from '@/hooks/redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type Control } from 'react-hook-form'
import { z } from 'zod'
import {
  OBJECT_TYPES,
  ClientItemSubmissionSchema as formSchema,
} from '~shared/schemas'

export function AddItemForm() {
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
    // Commented out while testing invalid inputs and designing the form
    // dispatch({ type: 'api/admin/addItem', payload: values })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <MainInputs control={form.control} />
        <RightAscensionInputs control={form.control} />
        <DeclinationInputs control={form.control} />
        <DistanceInputs control={form.control} />
        <OtherInputs control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}