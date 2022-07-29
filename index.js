/* 
Crear un login para la app del cajero, el usuario podra ingresar tu password y user,
cuando el usuario pueda ingresar al cajero, tendra 3 opciones, depositar, Retirar y consultar saldo.
el diseno es libre y pueden usar Bootstrap.
Cuando el usuario quiera depositar no podra realizar depositos mayores a $ 2,000.00
Cuando el usuario quiera retirar dinero SIEMPRE debera dejar un saldo minimo de $ 10.00 en la cuenta.

Posiciones usuarios:
0->Cuenta
1->Password
2->Nombre
3->Apellido
4->Saldo Almacenado
5->Contador de intentos de acceso
*/
let usuarios = [
    ["joel.lozano", "joel_123456", "Joel", "Lozano", 5000, 0],
    ["miguel_monte", "miguel78951", "Miguel", "Monterroso", 1000, 0],
    ["jdpl.0822", "jdpl-35789", "David", "Parra", 200, 0]
];
let saldoUsuario = 0;

const login = document.getElementById("login");
login.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let nomUser = document.getElementById("txtUsuario").value;
    let pwdUser = document.getElementById("txtPassword").value;

    let divLogin = document.getElementById("log");
    let divUser= document.getElementById("user");
    let divCarousel = document.getElementById("idCarousel");
    let etiquetaBienvenida = document.getElementById("Bienvenido");
    let divOpciones = document.getElementById("opciones");

    if(validarCredenciales(nomUser, pwdUser))
    {
        let validaUsuario = false;
        for (let index = 0; index < usuarios.length; index++) {
            if(nomUser == usuarios[index][0]){
                if(usuarios[index][5] == 3){
                    alert('Ha excedido el máximo de intentos permitidos, y el usuario se ha bloqueado.');
                }
                else
                {
                    if(pwdUser == usuarios[index][1]){
                        saldoUsuario = parseFloat(usuarios[index][4]);
                        etiquetaBienvenida.innerHTML = '<span>Bienvenido a tu cuenta </span> <strong>' + usuarios[index][2] + ' ' + usuarios[index][3] + '</strong>';
                        etiquetaBienvenida.style.marginRight = ".5rem";
                        divLogin.classList.add("ocultarControl");
                        divUser.classList.add("mostrarControl");
                        divCarousel.classList.add("ocultarControl");
                        divOpciones.classList.add("mostrarControl");
                        validaUsuario = true;
                        break;
                    }
                    else if(index == (usuarios.length)-1){
                        alert('Password incorrecto');
                        document.getElementById("txtPassword").focus();
                        usuarios[index][5]++;
                    }
                }
            }
            else if(index == (usuarios.length)-1){
                alert('Nombre de usuario incorrecto');
                document.getElementById("txtUsuario").focus();
            }
        }
    }
});

let validarCredenciales = (txtU, txtP) => {
    if(txtU.length < 3){
        alert("Usuario requiere al menos 3 caracteres");
        return false;
    }
    else if(txtP.length < 3){
        alert("Password requiere al menos 3 caracteres");
        return false;
    }
    return true;
}

function mostrarSaldo(){
    document.getElementById("lblSaldo").innerHTML = '$' + parseFloat(saldoUsuario);
}

function retirarEfectivo(){
    let txtSaldoRetirar = document.getElementById("txtRetirar");
    if(txtSaldoRetirar.value.length < 1){
        alert("Favor de introducir la cantidad");
        txtSaldoRetirar.focus();
    }
    else{
        let saldoRestante = saldoUsuario - parseFloat(txtSaldoRetirar.value);
        if(saldoRestante < 10){
            alert("Cantidad de retiro excede lo permitido. En su cuenta debe existir al menos $10.00");
            txtSaldoRetirar.focus();
        }
        else{
            saldoUsuario = parseFloat(saldoRestante);
            alert("Retiro realizado exitosamente. Su nuevo saldo es $" + saldoUsuario);
            txtSaldoRetirar.value = "";
            document.getElementById("btnCloseModalRetirar").click();
        }
    }
}

function depositarEfectivo(){
    let txtSaldoDepositar = document.getElementById("txtDepositar");
    if(txtSaldoDepositar.value.length < 1){
        alert("Favor de introducir la cantidad");
        txtSaldoDepositar.focus();
    }
    else{
        let nuevoSaldo = saldoUsuario + parseFloat(txtSaldoDepositar.value);
        if(nuevoSaldo > 2000){
            alert("No se permite realizar depositos mayores a $2,000.00. Disculpe los inconvenientes, e intente de nuevo con otra cantidad.");
            txtSaldoDepositar.focus();
        }
        else{
            saldoUsuario = parseFloat(nuevoSaldo);
            alert("Deposito realizado exitosamente. Su nuevo saldo es $" + saldoUsuario);
            txtSaldoDepositar.value = "";
            document.getElementById("btnCloseModalDepositar").click();
        }
    }
}

function cerrarSesion(){
    window.location.href = "index.html";
}