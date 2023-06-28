// Clases

class Alumnx{

    constructor(nombre, dni){
        this.nombre = nombre;
        this.dni = dni;
        this.materias = [];
        this.notas = {};
    }

    agregarMateria(materia){
        if(this.materias.includes(materia)){
            return `Ya estas inscriptx a ${materia.nombre}`;
        }else{
            this.materias.push(materia);
            this.notas[materia.nombre] = [];
            return `Inscripción exitosa a ${materia.nombre}`;
        }
    }

    agregarNota(nombreDeMateria, nota){
        if(nombreDeMateria in this.notas){
            this.notas[nombreDeMateria].push(nota);
            return `La nota fue añadida`;
        }else{
            return `No estas inscriptx a ${nombreDeMateria}`;
        }
    }

    verMaterias(){
        return this.materias;
    }

    verNombreDeMaterias(){
        return this.materias.map((materia)=>materia.nombre);
    }

    verNotas(nombreDeMateria){
        if(nombreDeMateria in this.notas){
            return this.notas[nombreDeMateria];
        }else{
            return `No estas inscriptx a ${nombreDeMateria}`;
        }
    }

    verPromedioDe(nombreDeMateria){
        if(nombreDeMateria in this.notas){
            let result = 0;
            for(let i=0; i<this.notas[nombreDeMateria].length; i++){
                result += this.notas[nombreDeMateria][i];
            }
            return result/this.notas[nombreDeMateria].length;
    
        }else{
            return `No estas inscriptx a ${nombreDeMateria}`
        }
    }

    verPromedioTotalDeCarrera(){ // operacion de orden cuadrático, ver como mejorar.
        let cantNotas = 0;
        let resultado = 0;
        for(let materia in this.notas){
            let notas = this.notas[materia]; // guarda valor de clave materia (arreglo de notas).
            for(let i=0; i<notas.length; i++){
                cantNotas++;
                resultado += notas[i];
            }
        }
        return resultado/cantNotas;
    }


}

class Materia{

    constructor(nombre){
        this.nombre = nombre;
    }

}

class Facultad{

    constructor(){
        this.materiasDisponibles = [];
        this.alumnxs = [];
    }

    agregarMateria(materia){
        this.materiasDisponibles.push(materia); // materia es objeto de clase Materia
    }

    verMaterias(){
        return this.materiasDisponibles; // devuelve arreglo
    }

    verNombreDeMaterias(){
        return this.materiasDisponibles.map((materia)=>materia.nombre);
    }

    agregarAlumnx(alumnx){
        this.alumnxs.push(alumnx); // materia es objeto de clase Materia
    }

    verAlumnxs(){
        return this.alumnxs; // devuelve arreglo
    }

    comprobarInscripcion(dni){
        for(let alumnx of this.alumnxs){
            if(alumnx.dni==dni){
                return true;
            }
        }
        return false;
    }

    objAlumnx(dni){
        for(let alumnx of this.alumnxs){
            if(alumnx.dni==dni){
                return alumnx;
            }
        }
    }

}

// Inicializacion

let facu = new Facultad();
facu.agregarMateria(new Materia(`Estadistica`));
facu.agregarMateria(new Materia(`Análisis`));
facu.agregarMateria(new Materia(`Algoritmos`));

// Menú

function menuPrincipal(){
    let dni = parseInt(prompt("Ingresa tu dni:"));
    while(isNaN(dni)|| typeof dni != "number"){
        dni = (parseInt(prompt("Por favor, ingresa el dato solicitado correctamente. \nIngresá tu dni:")))
    }

    if(!facu.comprobarInscripcion(dni)){
        alert(`No estas inscriptx al sistema. A continuación, inscribite.`)
        menuInscripcionFacultad(dni);
    }

    menuMaterias(dni);
}

function menuInscripcionFacultad(dni){
    let nombre = prompt("Ingresá tu nombre");
    while(nombre==null||nombre==""||typeof nombre != "string"){
        nombre = (prompt("Por favor, ingresa el dato solicitado correctamente.\nIngresá tu nombre:"))
    }
    facu.agregarAlumnx(new Alumnx(nombre, dni));
    alert(`${nombre}, dni ${dni}, te registraste correctamente.`)
}

function stringOpcionesMateriasInscriptx(objAlumnx){
    let result = "";
    for(let i=0; i<objAlumnx.verNombreDeMaterias().length; i++){
        result += `
        ${i}- ${objAlumnx.verNombreDeMaterias()[i]}`
    }
    return result;
}

function menuMaterias(dni){
    let objAlumnx = facu.objAlumnx(dni);
    let seguir = true;
    while(seguir){
        switch(parseInt(prompt(`${objAlumnx.nombre}, ingresa la opcion deseada:
        0- Ver materias a las que está inscriptx
        1- Agregar materia
        2- Ver las notas de una materia
        3- Agregar notas de una materia
        4- Ver promedio de una materia
        5- Ver promedio total de carrera
        6- SALIR`))){

            case 0:
                if(objAlumnx.verNombreDeMaterias().length == 0){
                    alert("No estas inscriptx a ninguna materia.")
                }
            else{
                alert(objAlumnx.verNombreDeMaterias());
            }
                break;
            
            case 1:
                let op1 = parseInt(prompt(`Ingresa el numero de materia que queres agregar
                0 - ${facu.verNombreDeMaterias()[0]}
                1 - ${facu.verNombreDeMaterias()[1]}
                2 - ${facu.verNombreDeMaterias()[2]}
                3 - volver atras`));
                switch (op1){
                    case 0:
                    case 1:
                    case 2:
                        alert(objAlumnx.agregarMateria(facu.verMaterias()[op1]));
                        break;
                    default:
                        break;
                }
                break

            case 2:
                if(stringOpcionesMateriasInscriptx(objAlumnx).length==0){
                    alert("No estas inscriptx a ninguna materia");
                    break;
                }
                let op2 = parseInt(prompt(`Ingresa el numero de materia de la que queres ver tus notas ${stringOpcionesMateriasInscriptx(objAlumnx)}`));
                switch (op2){
                    case 0:
                    case 1:
                    case 2:
                        if(objAlumnx.verNotas(objAlumnx.verNombreDeMaterias([op2]).length == 0)){
                            alert(`No tenes ninguna nota registrada en la materia ${objAlumnx.verNombreDeMaterias([op2])}`);
                            break;
                        }
                        alert(objAlumnx.verNotas(objAlumnx.verNombreDeMaterias()[op2]));
                        break;
                    default:
                        break;
                }
                break

            case 3:
                if(stringOpcionesMateriasInscriptx(objAlumnx).length==0){
                    alert("No estas inscriptx a ninguna materia");
                    break;
                }
                let op3 = parseInt(prompt(`Ingresa el numero de materia de la que queres agregar una nota ${stringOpcionesMateriasInscriptx(objAlumnx)}`));
                let nota = parseInt(prompt(`Ingresa nota`));
                switch (op3){
                    case 0:
                    case 1:
                    case 2:
                        alert(objAlumnx.agregarNota(objAlumnx.verNombreDeMaterias()[op3],nota));
                        break;
                    default:
                        break;
                }
                break;

            case 4:
                if(stringOpcionesMateriasInscriptx(objAlumnx).length==0){
                    alert("No estas inscriptx a ninguna materia");
                    break;
                }
                let op4 = parseInt(prompt(`Ingresa el numero de materia de la que queres ver el promedio ${stringOpcionesMateriasInscriptx(objAlumnx)}`));
                switch (op4){
                    case 0:
                    case 1:
                    case 2:
                        if(objAlumnx.verNotas(objAlumnx.verNombreDeMaterias([op4]).length == 0)){
                            alert(`No tenes ninguna nota registrada en la materia ${objAlumnx.verNombreDeMaterias([op4])}`);
                            break;
                        }
                        alert(objAlumnx.verPromedioDe(objAlumnx.verNombreDeMaterias()[op4]));
                        break;
                    default:
                        break;
                }
                break;

            case 5:
                if(stringOpcionesMateriasInscriptx(objAlumnx).length==0){
                    alert("No estas inscriptx a ninguna materia");
                    break;
                }
                alert(`El promedio total de tu carrera es ${objAlumnx.verPromedioTotalDeCarrera()}`);
                break;

            default:
                seguir = false;
                break;
        }
        
    }
}

menuPrincipal();

