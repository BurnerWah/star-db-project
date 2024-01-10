import { RequireNotAuth } from '@/components/auth'
import {
  TypographyH2,
  TypographyH4,
  TypographyP,
} from '@/components/typography'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div>
      <TypographyH2>Welcome</TypographyH2>

      <div className="flex flex-initial flex-row flex-wrap items-start justify-start">
        <div className="box-border max-w-[66.66666667%] flex-none basis-2/3 p-0 px-2">
          <TypographyP>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </TypographyP>

          <TypographyP>
            Praesent consectetur orci dui, id elementum eros facilisis id. Sed
            id dolor in augue porttitor faucibus eget sit amet ante. Nunc
            consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
            finibus metus facilisis. Nullam eget lectus non urna rhoncus
            accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
            euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
            lobortis augue mi vel felis. Duis ultrices sapien at est convallis
            congue.
          </TypographyP>

          <TypographyP>
            Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
            Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
            vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
            sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
            non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
            amet nisi.
          </TypographyP>
        </div>
        <div className="box-border max-w-[33.33333333%] flex-none basis-2/3 p-0 px-2">
          <RegisterForm />

          <center>
            <TypographyH4>Already a Member?</TypographyH4>
            <Button
              onClick={() => {
                navigate('/login')
              }}
            >
              Login
            </Button>
          </center>
        </div>
      </div>
    </div>
  )
}

export function Component() {
  return (
    <RequireNotAuth>
      <Landing />
    </RequireNotAuth>
  )
}

Component.displayName = 'LazyLanding'
