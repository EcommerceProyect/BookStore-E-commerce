function Faqs() {
  return (
    <div class="container my-10 mx-auto md:px-6">
      <section class="mb-32">
        <h2 class="mb-6 text-3xl font-bold">Preguntas Frecuentes</h2>

        <p class="mb-12 text-neutral-800">
          ¿No encontraste respuesta a la pregunta que tenías?
          <a href="#!" class="text-blue-500">
            Contáctanos
          </a>
        </p>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="mb-6 md:mb-0">
            <p class="mx-2 font-bold">
              Tengo problemas con el pago ¿Cómo puedo resolverlo?
            </p>
            <p class="mb-12 mx-2 text-neutral-800">
              Si recibes una notificación de que se ha rechazado tu tarjeta,
              deberás contactar con tu banco en primer lugar para averiguar cuál
              es el motivo. Para más información y tras verificar con tu banco,
              podrás solicitar ayuda mediante el formulario de contacto.
            </p>

            <p class="mx-2 font-bold">
              ¿Es obligatorio crear una cuenta para comprar?
            </p>
            <p class="mb-12 mx-2 text-neutral-800">
              Sí, es necesario que te crees una cuenta para realizar compras.
            </p>

            <p class="mx-2 font-bold">¿Cuánto tarda en llegar el pedido?</p>
            <p class="mb-12 mx-2 text-neutral-800">
              El tiempo de entrega dependerá del tipo de envío seleccionado. En
              general la demora se encuentra entre 1 y 7 días hábiles luego de
              acreditado el pago.
            </p>

            <p class="mx-2 font-bold">
              ¿Puedo realizar un cambio del producto comprado?
            </p>
            <p class="mb-12 mx-2 text-neutral-800">
              Sí, puedes solicitar un cambio hasta 7 días luego de realizada la
              compra.
            </p>
          </div>

          <div class="mb-6 md:mb-0">
            <p class="mx-2 font-bold">
              ¿Es obligatorio crear una cuenta para comprar?
            </p>
            <p class="mb-12 mx-2 text-neutral-800">
              Sí, es necesario que te crees una cuenta para realizar compras.
            </p>

            <p class="mx-2 font-bold">¿Cómo creo una cuenta?</p>
            <p class="mb-12 mx-2 text-neutral-800">
              Crear una cuenta es muy sencillo, necesitas un email, una
              contraseña y completar los datos solicitados. Accede al apartado
              “Iniciar sesión” en la parte superior de la tienda para crear una
              cuenta nueva.
            </p>

            <p class="font-bold">
              ¿Tengo algún descuento si compro en cantidad?
            </p>
            <p class="mb-12 text-neutral-800">
              No contamos con descuentos para compras por cantidad.
            </p>

            <p class="font-bold">
              ¿Puedo modificar la cantidad de mi compra después de haberla
              realizado?
            </p>
            <p class="mb-12 text-neutral-800">
              No se permiten cambios de pedidos ya procesados. Si deseas
              modificar la cantidad deberás cancelar el pedido inicial y
              realizar uno nuevo con la cantidad correcta.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Faqs;
