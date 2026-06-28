function Reto9(notafinal, asistencia, entregasrealizadas,totalentregas, notaCorteAnterior = null) {
const datosvalidos =
notafinal >= 0 && notafinal <= 100 &&
asistencia >= 0 && asistencia <= 100 &&
entregasrealizadas >= 0 && entregasrealizadas <= totalentregas &&
totalentregas > 0;

if (!datosvalidos){
    return{
        estado:"datos validos",
        recomendacion:"varificar los valores ingresados: nota y asistencia deben estar 0-100, y las entragas no pueden superar el total."
    };
}

const todaslasentregas = entregasrealizadas === totalentregas;
const asistenciaminima = asistencia >= 80;
const entregasminimas = entregasrealizadas >= Math.ceil(totalentregas * 0.6);

let esatdo;
let recomendacion;

if (notafinal >= 90 && asistenciaminima && totalentregas) {
    esatdo = "excelente";
    recomendacion= "gran trabajo manten tu constancia y considerar apoyar a otros como mentor.";
} else if (notafinal >= 70 && asistencia >= 60 && entregasminimas) {
    estado = "aprobado";
    recomendacion = "bune desempeño. refuerza temas con menor dominio para subir tu nivel.";
} else if (notafinal >= 50 &&  notafinal < 70) {
    estado = "recuperacion"
    recomendacion = "estas cerca de aprobar. programa tutorias y entrga las actividades pendientes cuanto antes.";
} else {
    estado = "reprobado";
    recomendacion = "es necesario reforzar contenidos desde la base . solicita acompañamientoacademico inmediato.";
}

if (notaCorteAnterior !== null && notaCorteAnterior >= 0 && notaCorteAnterior <= 100) {
    const mejorar = notafinal - notaCorteAnterior;
    if (mejorar >= 15 && estado !== "excelente"){
        estado += "(mencion: mejora destacada)";
        recomendacion += "ademas, tu progreso respecto al corte anterior es notable: ¡sigue asi!";
    }
}
return {estado, recomendacion};   
}

constpruebas = [
    {nota: 95, asistencia: 90, entregas: 5, total:5, CorteAnterior: 80},
    {nota: 75, asistencia: 65, entregas: 4, total:5, CorteAnterior: 70},
    {nota: 60, asistencia: 55, entregas: 3, total:5, CorteAnterior: 58},
    {nota: 40, asistencia: 50, entregas: 2, total:5, CorteAnterior: 45},
    {nota: 92, asistencia: 70, entregas: 5, total:5, CorteAnterior: null},
    {nota: 110, asistencia: 90, entregas: 5, total:5, CorteAnterior: null},
];

prubas.forEach((p, i) => {
    const resultado = calificarestudiante(p.nota, p.asistencia, p.entregas, p.total, p.CorteAnterior);
    console.log('pruba ${i + 1}:', resultado);
});