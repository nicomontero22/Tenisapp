// ============================================
// MODELOS DE DATOS PARA EL SISTEMA DE RESERVAS
// ============================================

/**
 * CLUB - Información del club
 */
export const ClubModel = {
    id: '',
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    images: [],
    amenities: [],

    // Configuración de precios
    pricing: {
        depositPercentage: 30, // % de seña (comisión app)
        cashDiscountPercentage: 5, // Descuento por pago en efectivo del saldo
    },

    // Políticas
    policies: {
        cancellationPolicy: 'NO_REFUND', // 'NO_REFUND', 'PARTIAL_REFUND'
        rainPolicy: 'CREDIT_RESCHEDULE', // 'CREDIT_RESCHEDULE', 'REFUND'
        minAdvanceBooking: 2, // Horas mínimas de anticipación
        maxAdvanceBooking: 30, // Días máximos de anticipación
    },

    rating: 0,
    reviewCount: 0,
    courts: [], // Array de Court
};

/**
 * COURT - Cancha individual
 */
export const CourtModel = {
    id: '',
    clubId: '',
    name: '', // "Cancha 1", "Court Central"
    courtType: '', // 'clay', 'hard', 'grass', 'carpet'
    hasLights: false,
    isIndoor: false,

    // Precios base por hora según duración
    pricing: {
        '1h': 3500,
        '1.5h': 5000,
        '2h': 6500,
        '2.5h': 8000,
    },

    // Precios con luz (si hasLights = true)
    nightPricing: {
        '1h': 4000,
        '1.5h': 5500,
        '2h': 7000,
        '2.5h': 8500,
    },

    status: 'ACTIVE', // 'ACTIVE', 'MAINTENANCE', 'INACTIVE'
};

/**
 * BLOCK - Bloqueos de horarios (clases, mantenimiento, etc)
 */
export const BlockModel = {
    id: '',
    courtId: '',
    clubId: '',

    // Tipo de bloqueo
    type: '', // 'RECURRING_CLASS', 'MAINTENANCE', 'PRIVATE_EVENT', 'SUBSCRIPTION'
    title: '', // "Escuela de Menores", "Mantenimiento", "Torneo Interno"
    description: '',

    // Horario
    startTime: '', // "17:00"
    endTime: '', // "19:00"

    // Recurrencia (para clases fijas)
    isRecurring: false,
    recurrence: {
        daysOfWeek: [], // [1, 3, 5] = Lunes, Miércoles, Viernes (0=Domingo, 6=Sábado)
        startDate: '', // Fecha inicio de vigencia
        endDate: '', // Fecha fin de vigencia (null = indefinido)
    },

    // Bloqueo puntual (para mantenimiento o eventos)
    specificDate: null, // "2024-03-15" (si no es recurrente)

    // Excepciones (ej: "Este martes es feriado")
    exceptions: [], // ['2024-03-19', '2024-04-02'] - Fechas donde NO aplica el bloqueo

    createdAt: '',
    createdBy: '', // userId del administrador
};

/**
 * BOOKING - Reserva de cancha
 */
export const BookingModel = {
    id: '',
    userId: '',
    clubId: '',
    courtId: '',

    // Fecha y hora
    date: '', // "2024-03-15"
    startTime: '', // "18:00"
    endTime: '', // "19:30"
    duration: 0, // En minutos: 60, 90, 120, 150

    // Precios
    pricing: {
        basePrice: 0, // Precio base de la cancha
        totalAmount: 0, // Precio total
        depositAmount: 0, // Seña (30% aprox)
        remainingAmount: 0, // Saldo a pagar en club
        cashDiscountAmount: 0, // Descuento si paga en efectivo
        finalRemainingWithDiscount: 0, // Saldo final con descuento
    },

    // Estado del pago
    paymentStatus: {
        depositPaid: false, // ¿Pagó la seña online?
        depositPaidAt: null,
        depositPaymentId: '', // ID de transacción Mercado Pago/Modo

        remainingPaid: false, // ¿Pagó el saldo en el club?
        remainingPaidAt: null,
        remainingPaymentMethod: '', // 'CASH', 'CARD', 'TRANSFER'
        appliedCashDiscount: false,
    },

    // Estado de la reserva
    status: '', // 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RAIN_CREDIT'

    // Cancelación
    cancellation: {
        cancelledAt: null,
        cancelledBy: '', // 'USER', 'CLUB', 'SYSTEM'
        reason: '', // 'USER_CANCEL', 'RAIN', 'MAINTENANCE'
        creditGenerated: false, // ¿Se generó crédito por lluvia?
        creditId: '', // ID del crédito generado
    },

    // Check-in en el club
    checkIn: {
        checkedIn: false,
        checkedInAt: null,
        checkedInBy: '', // userId del recepcionista
        qrScanned: false,
    },

    // Metadata
    createdAt: '',
    updatedAt: '',

    // Notas
    userNotes: '', // Notas del usuario
    clubNotes: '', // Notas del club (internas)
};

/**
 * CREDIT - Crédito por cancelación por lluvia
 */
export const CreditModel = {
    id: '',
    userId: '',
    clubId: '',
    originalBookingId: '', // Reserva original cancelada

    amount: 0, // Monto del crédito (= seña de la reserva cancelada)

    status: 'ACTIVE', // 'ACTIVE', 'USED', 'EXPIRED'

    // Uso
    usedInBookingId: null, // ID de la nueva reserva donde se usó
    usedAt: null,

    // Expiración
    expiresAt: '', // Fecha de expiración (ej: 90 días)

    createdAt: '',
    reason: 'RAIN_CANCELLATION',
};

/**
 * PAYMENT_BREAKDOWN - Desglose de pago para mostrar al usuario
 */
export const PaymentBreakdown = {
    totalAmount: 0,
    depositAmount: 0,
    depositPercentage: 30,

    remainingAmount: 0,
    cashDiscountPercentage: 5,
    cashDiscountAmount: 0,
    finalRemainingWithCash: 0,

    savings: 0, // Ahorro total si paga en efectivo
};

/**
 * AVAILABILITY_SLOT - Slot de disponibilidad para mostrar en el calendario
 */
export const AvailabilitySlot = {
    courtId: '',
    courtName: '',
    date: '',
    startTime: '',
    endTime: '',
    duration: 60, // minutos
    price: 0,
    available: true,
    reason: null, // Si no está disponible: 'BOOKED', 'BLOCKED', 'PAST'
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Calcular desglose de pago
 */
export const calculatePaymentBreakdown = (basePrice, depositPercentage = 30, cashDiscountPercentage = 5) => {
    const depositAmount = Math.round(basePrice * (depositPercentage / 100));
    const remainingAmount = basePrice - depositAmount;
    const cashDiscountAmount = Math.round(remainingAmount * (cashDiscountPercentage / 100));
    const finalRemainingWithCash = remainingAmount - cashDiscountAmount;

    return {
        totalAmount: basePrice,
        depositAmount,
        depositPercentage,
        remainingAmount,
        cashDiscountPercentage,
        cashDiscountAmount,
        finalRemainingWithCash,
        savings: cashDiscountAmount,
    };
};

/**
 * Verificar si un horario está bloqueado
 */
export const isTimeSlotBlocked = (date, startTime, endTime, blocks) => {
    // TODO: Implementar lógica de verificación de bloqueos
    // Considerar:
    // - Bloqueos recurrentes por día de semana
    // - Bloqueos específicos por fecha
    // - Excepciones
    return false;
};

/**
 * Generar slots de disponibilidad para un día
 */
export const generateAvailabilitySlots = (court, date, blocks, bookings) => {
    // TODO: Implementar generación de slots
    // Considerar:
    // - Horario de apertura/cierre del club
    // - Bloqueos fijos y temporales
    // - Reservas existentes
    // - Regla anti-huecos
    return [];
};

export default {
    ClubModel,
    CourtModel,
    BlockModel,
    BookingModel,
    CreditModel,
    PaymentBreakdown,
    AvailabilitySlot,
    calculatePaymentBreakdown,
    isTimeSlotBlocked,
    generateAvailabilitySlots,
};