'use client'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { Label } from '../../../components/ui/label'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import ErrorAlert from '../../../components/ui/errorAlert'

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')
  const [showAlert, setShowAlert] = useState(false)

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validaciones
    if (!email || !validateEmail(email)) {
      setError('Por favor ingresa un email válido.')
      setShowAlert(true)
      return
    }

    if (!password || password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      setShowAlert(true)
      return
    }

    setError('')
    setShowAlert(false)

    const credentials = { email, password }
    console.log('Credenciales enviadas:', credentials)
    // Aquí puedes agregar la llamada al backend para autenticar
  }

  return (
    <div className="w-full h-screen flex justify-center align-middle items-center">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              ¡Ingresa y gestiona tus finanzas personales!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pass">Contraseña</Label>
                <Input
                  type="password"
                  id="pass"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" variant="neutral">
              Ingresar
            </Button>
          </CardFooter>
        </form>
      </Card>
      {showAlert && (
        <ErrorAlert
          message={error}
          onClose={() => setShowAlert(false)}
          color="bg-[#ff6b6b]"
        />
      )}
    </div>
  )
}

export default Page
