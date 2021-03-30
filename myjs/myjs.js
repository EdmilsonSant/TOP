//const proxyurl = "https://cors-anywhere.herokuapp.com/";
let data;


function populaDashboard(){
  $.ajax({
      
    async: true,
    url: "https://api-java-top.herokuapp.com/top",
    method: "GET",

    success:function(response){

      console.log(response);

      for (let index = 0; index < response.processes.length; index++) {
      
        appendLine(response.processes[index].id,response.processes[index].user,response.processes[index].command);
      } 
      
        //consomeApi();
      /*Define clique dos botes da tabela e chama função
        de completar as informações do modal.*/
        
      var clicado = null, nome = null;
      $('.clicado').click(function () {
          pid = $(this).parents('tr').find('th').eq(0).text();
          
          $.ajax({
      
            async: true,
            url: "https://api-java-top.herokuapp.com/top/process/"+pid,
            method: "GET",
    
            success:function(response){

              addCompleteModal(pid,response.user,response.priority,response.niceLevel,response.virtualMemoryUsed,response.residentMemoryUsed,
                response.percentageOfCpuUsed,response.percentageOfMemoryUsed,response.shareableMemory,response.command,response.upTime,response.state)

            },

            error: function(){
              console.log("Deu ruim");
            },
      
          });
          
          
          //addCompleteModal(pid,map.pid.user,map.pid.priority,map.pid.nicelevel,map.pid.virtmemused,map.pid.resmemused,map.pid.cpuused,
            //map.pid.menused,map.pid.sharmen,map.pid.command,map.pid.uptime,map.pid.state);
      });
    },
    error: function(){
        console.log("Deu ruim");
    },

  });
}




//onload simplificada jquery
$(function(){
  
  populaDashboard();


});





/*insere componentes de exemplo na tabela
  de processos do dashboard*/
  
  /*Insere dados na modal do processo completo.
  A esqueda parametros na ordem de inserção
  a direita chave do processo no json.
  pid->pid
  user->user
  priority->priority
  nicelevel->niceLevel
  virtmemused->virtualMemoryUsed
  resmemused->residentMemoryUsed
  cpuused->percentageOfCpuUsed
  menused->percentageOfMemoryUsed
  sharmen->shareableMemory
  command->command
  uptime->upTime
  state->state
  */
function addCompleteModal(pid,user,priority,nicelevel,virtmemused,resmemused,cpuused,menused,sharmen,command,uptime,state){
  $('#pidmodal').text(pid);
  $('#usermodal').text(user);
  $('#priomodal').text(priority);
  $('#nilvlmodal').text(nicelevel);
  $('#vmumodal').text(virtmemused);
  $('#rmumodal').text(resmemused);
  $('#pcumodal').text(cpuused);
  $('#pmumodal').text(menused);
  $('#shmmodal').text(sharmen);
  $('#cmdmodal').text(command);
  $('#tmmodal').text(uptime);
  $('#stsmodal').text(state);
}


/*adiciona linha na tabela de processos
A esqueda parametros na ordem de inserção
a direita chave do processo no json.
pid->pid
user->user
command->command
*/   
function appendLine(pid,user,command) {
  $('#process').append('<tr>'+
      '<th scope="row">'+pid+'</th>'+
      '<td>'+user+'</td>'+
      '<td>'+command+'</td>'+
    '<td>'+
          '<button type="button" class="btn btn-primary clicado" data-bs-toggle="modal" data-bs-target="#modal">'+
              'Complet Data'+
          '</button>'+
      '</td>'+
  '</tr>');
}


