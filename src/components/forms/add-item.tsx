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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
import { Diff } from 'lucide-react'
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
        <RightAscensionPopover control={form.control} />
        <DeclinationPopover control={form.control} />
        <DistancePopover control={form.control} />
        <OtherInputs control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

type SectionProps = Readonly<{ control: Control<z.infer<typeof formSchema>> }>

const patterns = {
  decimal: '[\\d.,]*',
  numeric: '\\d*',
}

function MainInputs({ control }: SectionProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="col-span-3">
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
          <FormItem className="col-span-1">
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
                <SelectItem value={OBJECT_TYPES.enum.BlackHole}>
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
    </div>
  )
}

function RightAscensionPopover({ control }: SectionProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Right Ascension</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={control}
            name="right_ascension.hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hours</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern={patterns.numeric}
                    {...field}
                  />
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
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern={patterns.numeric}
                    {...field}
                  />
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
                  <Input
                    type="text"
                    inputMode="decimal"
                    pattern={patterns.decimal}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

function DeclinationPopover({ control }: SectionProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Declination</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={control}
            name="declination.degrees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degrees</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern={patterns.numeric}
                    {...field}
                  />
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
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern={patterns.numeric}
                    {...field}
                  />
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
                  <Input
                    type="text"
                    inputMode="decimal"
                    pattern={patterns.decimal}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

function DistancePopover({ control }: SectionProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Distance</Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-fit">
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-3 flex">
            <FormField
              control={control}
              name="distance.value"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      aria-label="Distance in light years"
                      type="text"
                      inputMode="decimal"
                      pattern={patterns.decimal}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Diff className="inline-block" />
          </div>
          <div className="col-span-2 flex">
            <FormField
              control={control}
              name="distance.error"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      aria-label="Margin of error"
                      type="text"
                      inputMode="decimal"
                      pattern={patterns.decimal}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormDescription>
          Distance in Light Years with a margin of error
        </FormDescription>
      </PopoverContent>
    </Popover>
  )
}

function OtherInputs({ control }: SectionProps) {
  return (
    <>
      <TypographyH3>Other</TypographyH3>
      <div className="grid grid-cols-2 gap-2">
        <FormField
          control={control}
          name="apparent_magnitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apparent Magnitude</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="decimal"
                  pattern={patterns.decimal}
                  {...field}
                />
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
                <Input
                  type="text"
                  inputMode="decimal"
                  pattern={patterns.decimal}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="mass"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mass</FormLabel>
            <FormControl>
              <Input
                type="text"
                inputMode="decimal"
                pattern={patterns.decimal}
                {...field}
              />
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
              <Input
                type="text"
                inputMode="decimal"
                pattern={patterns.decimal}
                {...field}
              />
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
