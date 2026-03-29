'use client'

import { useMemo, useState } from 'react'
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Phone,
  Lock,
  AlertCircle,
  CheckCircle,
  Chrome
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { validateEmail, validatePassword } from '@/lib/validators/auth'

type FormData = {
  email: string
  firstName: string
  lastName: string
  phone: string
  password: string
  confirmPassword: string
}

type FormErrors = {
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  password?: string
  confirmPassword?: string
}

interface RegisterResponse {
  message: string
  token?: string
}

const initialFormData: FormData = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  password: '',
  confirmPassword: ''
}

function getInputClasses(hasError?: boolean, hasRightIcon?: boolean) {
  return [
    'w-full rounded-md border bg-white pl-9 py-2.5 outline-none',
    hasRightIcon ? 'pr-10' : 'pr-3',
    'text-[12px] text-[#292524] placeholder:text-[#78716c] transition-all duration-200',
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-200'
      : 'border-[#d6d3d1] focus:border-[#D97706] focus:ring-1 focus:ring-amber-200'
  ].join(' ')
}

function FieldError({
  id,
  error
}: {
  id: string
  error?: string
}) {
  if (!error) return null

  return (
    <p
      id={id}
      className="mt-1 flex items-center gap-1 text-[11px] text-red-500"
    >
      <AlertCircle size={12} />
      <span>{error}</span>
    </p>
  )
}

function FieldLabel({
  htmlFor,
  children
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 block text-[12px] font-medium text-[#292524]"
    >
      {children}
    </label>
  )
}

export default function SignUpForm() {
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [serverMessage, setServerMessage] = useState('')
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onlyLettersRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
  const onlyNumbersRegex = /^[0-9]*$/

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value
      const value = field === 'email' ? rawValue.trimStart() : rawValue

      setFormData((prev) => ({
        ...prev,
        [field]: value
      }))

      if (field === 'email') {
        const emailError = validateEmail(value)

        setErrors((prev) => ({
          ...prev,
          email: emailError || undefined
        }))
      }

      if (field === 'firstName') {
        setErrors((prev) => ({
          ...prev,
          firstName:
            value.trim() === ''
              ? 'El campo no puede estar vacío'
              : onlyLettersRegex.test(value)
                ? undefined
                : 'El nombre solo puede contener letras'
        }))
      }

      if (field === 'lastName') {
        setErrors((prev) => ({
          ...prev,
          lastName:
            value.trim() === ''
              ? 'El campo no puede estar vacío'
              : onlyLettersRegex.test(value)
                ? undefined
                : 'El apellido solo puede contener letras'
        }))
      }

      if (field === 'phone') {
        setErrors((prev) => ({
          ...prev,
          phone:
            value.trim() === ''
              ? 'El campo no puede estar vacío'
              : onlyNumbersRegex.test(value)
                ? undefined
                : 'El teléfono solo permite números'
        }))
      }

      if (field === 'password') {
        const passwordError = validatePassword(value)

        setErrors((prev) => ({
          ...prev,
          password: passwordError || undefined,
          confirmPassword:
            formData.confirmPassword.trim() === ''
              ? prev.confirmPassword
              : formData.confirmPassword !== value
                ? 'Las contraseñas no coinciden'
                : undefined
        }))
      }

      if (field === 'confirmPassword') {
        setErrors((prev) => ({
          ...prev,
          confirmPassword:
            value.trim() === ''
              ? 'El campo no puede estar vacío'
              : value !== formData.password
                ? 'Las contraseñas no coinciden'
                : undefined
        }))
      }
    }

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }))

    if (field === 'email') {
      const emailError = validateEmail(formData.email)

      setErrors((prev) => ({
        ...prev,
        email: emailError || undefined
      }))
    }

    if (field === 'firstName') {
      setErrors((prev) => ({
        ...prev,
        firstName:
          formData.firstName.trim() === ''
            ? 'El campo no puede estar vacío'
            : onlyLettersRegex.test(formData.firstName)
              ? undefined
              : 'El nombre solo puede contener letras'
      }))
    }

    if (field === 'lastName') {
      setErrors((prev) => ({
        ...prev,
        lastName:
          formData.lastName.trim() === ''
            ? 'El campo no puede estar vacío'
            : onlyLettersRegex.test(formData.lastName)
              ? undefined
              : 'El apellido solo puede contener letras'
      }))
    }

    if (field === 'phone') {
      setErrors((prev) => ({
        ...prev,
        phone:
          formData.phone.trim() === ''
            ? 'El campo no puede estar vacío'
            : onlyNumbersRegex.test(formData.phone)
              ? undefined
              : 'El teléfono solo permite números'
      }))
    }

    if (field === 'password') {
      const passwordError = validatePassword(formData.password)

      setErrors((prev) => ({
        ...prev,
        password: passwordError || undefined
      }))
    }

    if (field === 'confirmPassword') {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          formData.confirmPassword.trim() === ''
            ? 'El campo no puede estar vacío'
            : formData.confirmPassword !== formData.password
              ? 'Las contraseñas no coinciden'
              : undefined
      }))
    }
  }

  const handleCancel = () => {
    setFormData(initialFormData)
    setErrors({})
    setTouched({})
    setShowPassword(false)
    setShowConfirmPassword(false)
    setServerMessage('')
    setServerError('')
    setIsSubmitting(false)
    router.push('/')
  }

  const isFormValid = useMemo(() => {
    const requiredFieldsCompleted =
      formData.email.trim() !== '' &&
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== ''

    return (
      requiredFieldsCompleted &&
      !validateEmail(formData.email) &&
      !validatePassword(formData.password) &&
      onlyLettersRegex.test(formData.firstName) &&
      onlyLettersRegex.test(formData.lastName) &&
      onlyNumbersRegex.test(formData.phone) &&
      formData.confirmPassword === formData.password
    )
  }, [formData])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setServerMessage('')
    setServerError('')

    if (isSubmitting) return

    const emailError = validateEmail(formData.email)

    const firstNameError =
      formData.firstName.trim() === ''
        ? 'El campo no puede estar vacío'
        : onlyLettersRegex.test(formData.firstName)
          ? undefined
          : 'El nombre solo puede contener letras'

    const lastNameError =
      formData.lastName.trim() === ''
        ? 'El campo no puede estar vacío'
        : onlyLettersRegex.test(formData.lastName)
          ? undefined
          : 'El apellido solo puede contener letras'

    const passwordError = validatePassword(formData.password)

    const confirmPasswordError =
      formData.confirmPassword.trim() === ''
        ? 'El campo no puede estar vacío'
        : formData.confirmPassword !== formData.password
          ? 'Las contraseñas no coinciden'
          : undefined

    const phoneError =
      formData.phone.trim() === ''
        ? 'El campo no puede estar vacío'
        : onlyNumbersRegex.test(formData.phone)
          ? undefined
          : 'El teléfono solo permite números'

    const newErrors: FormErrors = {
      email: emailError || undefined,
      firstName: firstNameError,
      lastName: lastNameError,
      phone: phoneError,
      password: passwordError || undefined,
      confirmPassword: confirmPasswordError || undefined
    }

    setErrors(newErrors)
    setTouched({
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      password: true,
      confirmPassword: true
    })

    if (
      emailError ||
      firstNameError ||
      lastNameError ||
      passwordError ||
      confirmPasswordError ||
      phoneError
    ) {
      return
    }

    const payload = {
      nombre: formData.firstName.trim(),
      apellido: formData.lastName.trim(),
      correo: formData.email.trim().toLowerCase(),
      telefono: formData.phone.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim()
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      let data: RegisterResponse | null = null

      try {
        data = (await response.json()) as RegisterResponse
      } catch {
        data = null
      }

      if (!response.ok) {
        throw new Error(data?.message || 'No se pudo completar el registro')
      }

      if (data?.token) {
        localStorage.setItem('token', data.token)
      }

      setServerMessage(data?.message || 'Usuario registrado correctamente')

      setTimeout(() => {
        router.replace('/')
      }, 1500)
    } catch (error) {
      const message =
        error instanceof TypeError
          ? 'No hay conexión a internet o no se pudo conectar con el servidor'
          : error instanceof Error
            ? error.message
            : 'No se pudo completar el registro'

      setServerError(message)
      console.error('Error al registrar:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f4] px-4 py-8">
      {serverError ? (
        <div className="fixed bottom-6 right-6 z-50 flex min-w-[280px] items-start gap-3 border-l-4 border-red-400 bg-white px-4 py-3 shadow-lg">
          <AlertCircle className="mt-0.5 text-red-500" size={18} />
          <div>
            <p className="text-sm font-semibold text-[#292524]">Error</p>
            <p className="text-xs text-[#57534e]">{serverError}</p>
          </div>
        </div>
      ) : null}

      {serverMessage ? (
        <div className="fixed bottom-6 right-6 z-50 flex min-w-[280px] items-start gap-3 border-l-4 border-emerald-400 bg-white px-4 py-3 shadow-lg">
          <CheckCircle className="mt-0.5 text-emerald-500" size={18} />
          <div>
            <p className="text-sm font-semibold text-[#292524]">Éxito</p>
            <p className="text-xs text-[#57534e]">{serverMessage}</p>
          </div>
        </div>
      ) : null}

      <div className="w-full max-w-[340px]">
        <div className="border border-[#e7e5e4] bg-white px-4 py-5 shadow-sm">
          <h1 className="text-center text-[42px] font-extrabold leading-none text-[#292524]">
            Registrarse
          </h1>

          <p className="mt-2 mb-4 text-center text-[12px] text-[#57534e]">
            Crea tu cuenta para comenzar
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Ingresa tu correo electrónico"
                  className={getInputClasses(Boolean(touched.email && errors.email))}
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby="email-error"
                />
              </div>
              <FieldError
                id="email-error"
                error={touched.email ? errors.email : undefined}
              />
            </div>

            <div>
              <FieldLabel htmlFor="firstName">Nombre</FieldLabel>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  placeholder="Ingresa tu nombre"
                  maxLength={30}
                  className={getInputClasses(
                    Boolean(touched.firstName && errors.firstName)
                  )}
                  aria-invalid={Boolean(touched.firstName && errors.firstName)}
                  aria-describedby="firstName-error"
                />
              </div>
              <FieldError
                id="firstName-error"
                error={touched.firstName ? errors.firstName : undefined}
              />
            </div>

            <div>
              <FieldLabel htmlFor="lastName">Apellido(s)</FieldLabel>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder="Ingresa tu apellido"
                  maxLength={30}
                  className={getInputClasses(
                    Boolean(touched.lastName && errors.lastName)
                  )}
                  aria-invalid={Boolean(touched.lastName && errors.lastName)}
                  aria-describedby="lastName-error"
                />
              </div>
              <FieldError
                id="lastName-error"
                error={touched.lastName ? errors.lastName : undefined}
              />
            </div>

            <div>
              <FieldLabel htmlFor="phone">Numero de telefono</FieldLabel>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  placeholder="Ingresa tu numero de telefono"
                  maxLength={20}
                  className={getInputClasses(Boolean(touched.phone && errors.phone))}
                  aria-invalid={Boolean(touched.phone && errors.phone)}
                  aria-describedby="phone-error"
                />
              </div>
              <FieldError
                id="phone-error"
                error={touched.phone ? errors.phone : undefined}
              />
            </div>

            <div>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Ingresa tu contraseña"
                  maxLength={255}
                  className={getInputClasses(
                    Boolean(touched.password && errors.password),
                    true
                  )}
                  aria-invalid={Boolean(touched.password && errors.password)}
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#78716c] hover:bg-[#f5f5f4] hover:text-[#292524]"
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <FieldError
                id="password-error"
                error={touched.password ? errors.password : undefined}
              />
            </div>

            <div>
              <FieldLabel htmlFor="confirmPassword">
                Confirmar contraseña
              </FieldLabel>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Ingresa tu contraseña"
                  maxLength={255}
                  className={getInputClasses(
                    Boolean(touched.confirmPassword && errors.confirmPassword),
                    true
                  )}
                  aria-invalid={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  aria-describedby="confirmPassword-error"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#78716c] hover:bg-[#f5f5f4] hover:text-[#292524]"
                  aria-label={
                    showConfirmPassword
                      ? 'Ocultar confirmación de contraseña'
                      : 'Mostrar confirmación de contraseña'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>
              </div>
              <FieldError
                id="confirmPassword-error"
                error={
                  touched.confirmPassword ? errors.confirmPassword : undefined
                }
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full rounded-md px-4 py-2.5 text-[13px] font-semibold transition ${
                  isFormValid && !isSubmitting
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'cursor-not-allowed bg-[#e7e5e4] text-[#78716c]'
                }`}
              >
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-[#d6d3d1] bg-white px-4 py-2.5 text-[12px] font-medium text-[#292524] transition hover:bg-[#fafaf9]"
            >
              <Chrome size={14} />
              Regístrate con Google
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="mx-auto block rounded-md bg-[#292524] px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-[#1c1917]"
            >
              Cancelar registro
            </button>

            <p className="pt-1 text-center text-[12px] text-[#78716c]">
              ¿Ya tienes una cuenta?{' '}
              <Link
                href="/sign-in"
                className="font-medium text-amber-600 transition hover:text-amber-700"
              >
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}