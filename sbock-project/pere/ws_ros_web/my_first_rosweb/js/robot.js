document.addEventListener('DOMContentLoaded', event => {

    var btn_conectar = document.getElementById("btn_con")
    var btn_desconectar = document.getElementById("btn_dis")
    var btn_mover = document.getElementById("btn_move")
    var btn_stop = document.getElementById("btn_stop")
    var btn_turn = document.getElementById("btn_turn")
    var panel_control = document.getElementById("panel_control")

    btn_desconectar.style.display = 'none'  
    btn_stop.style.display = 'none'
    btn_turn.style.display = 'none'
    panel_control.style.display = 'none'

    document.getElementById("btn_con").addEventListener("click", connect)
    document.getElementById("btn_dis").addEventListener("click", disconnect)
    document.getElementById("btn_move").addEventListener("click", move)
    document.getElementById("btn_stop").addEventListener("click", pause)
    document.getElementById("btn_turn").addEventListener("click", cambiar_sentido)
    document.getElementById("btn_up").addEventListener("click", () => {
        call_delante_service("delante")
    })
    document.getElementById("btn_down").addEventListener("click", () => {
        call_delante_service("atras")
    })
    document.getElementById("btn_right").addEventListener("click", () => {
        call_delante_service("derecha")
    })
    document.getElementById("btn_left").addEventListener("click", () => {
        call_delante_service("izquierda")
    })
    document.getElementById("btn_pausa").addEventListener("click", () => {
        call_delante_service("parar")
    })

    data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
        // service information 
        service_busy: false, 
        service_response: ''
    }

    function connect(){
        console.log("Clic en connect")
	
        data.ros = new ROSLIB.Ros({
            url: data.rosbridge_address
        })

        // Define callbacks
        data.ros.on("connection", () => {
            data.connected = true
            console.log("Conexion con ROSBridge correcta")
            btn_conectar.style.display = 'none'
            btn_desconectar.style.display = 'inline'
            panel_control.style.display = 'inline'
        })
        data.ros.on("error", (error) => {
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
        })
        data.ros.on("close", () => {
            data.connected = false
            console.log("Conexion con ROSBridge cerrada")	  
            btn_conectar.style.display = 'inline'
            btn_desconectar.style.display = 'none'  
            panel_control.style.display = 'none'	 
        })
    }

    function disconnect(){
        pause()
        data.ros.close()        
        data.connected = false
        console.log('Clic en botón de desconexión')
    }

    function move(){
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: 0.1, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: -0.2, },
        })
        topic.publish(message)
        btn_mover.style.display = 'none'
        btn_stop.style.display = 'inline'
        btn_turn.style.display = 'inline'
    }

    function pause() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: 0.0, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: 0.0, },
        })
        topic.publish(message)
        btn_mover.style.display = 'inline'
        btn_stop.style.display = 'none'
        btn_turn.style.display = 'none'
    }

    function cambiar_sentido() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        //if (message.angular.z == -0.2){
            let message = new ROSLIB.Message({
                linear: {x: 0.1, y: 0, z: 0, },
                angular: {x: 0, y: 0, z: 0.2, },
            })
            topic.publish(message)
        /*} else {
            let message = new ROSLIB.Message({
                linear: {x: 0.1, y: 0, z: 0, },
                angular: {x: 0, y: 0, z: -0.2, },
            })
            topic.publish(message)
        }
        */
    }

    function call_delante_service(valor){
        data.service_busy = true
        data.service_response = ''	
    
      //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/movement',
            serviceType: 'custom_interface/srv/MyMoveMsg'
        })
    
        let request = new ROSLIB.ServiceRequest({
            move: valor
        })
    
        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })	
    }
    
});
