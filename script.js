$(document).ready(function() {

  var apiRoot = 'https://bluenumbers.herokuapp.com/results/';
  var datatableRowTemplate = $('[data-datatable-row-template]').children()[0];
  var resultsContainer = $('[data-results-container]');

  getAllResults();

  function createElement(data) {
    var element = $(datatableRowTemplate).clone();

    element.attr('data-result-id', data.id);
    element.find('[data-result-time-section] [data-result-time-paragraph]').text(data.day);
    element.find('[data-result-time-section] [data-result-time-input]').val(data.day);

    element.find('[data-result-patrolType-section] [data-result-patrolType-paragraph]').text(data.patrolType);
    element.find('[data-result-patrolType-section] [data-result-patrolType-input]').val(data.patrolType);

    element.find('[data-result-name-section] [data-result-name-paragraph]').text(data.name);
    element.find('[data-result-name-section] [data-result-name-input]').val(data.name);

    element.find('[data-result-people-section] [data-result-people-paragraph]').text(data.people);
    element.find('[data-result-people-section] [data-result-people-input]').val(data.people);

    element.find('[data-result-interventions-section] [data-result-interventions-paragraph]').text(data.interventions);
    element.find('[data-result-interventions-section] [data-result-interventions-input]').val(data.interventions);

    element.find('[data-result-instruction-section] [data-result-instruction-paragraph]').text(data.instruction);
    element.find('[data-result-instruction-section] [data-result-instruction-input]').val(data.instruction);

    element.find('[data-result-instructionFor-section] [data-result-instructionFor-paragraph]').text(data.instructionFor);
    element.find('[data-result-instructionFor-section] [data-result-instructionFor-input]').val(data.instructionFor);

    element.find('[data-result-tickets-section] [data-result-tickets-paragraph]').text(data.tickets);
    element.find('[data-result-tickets-section] [data-result-tickets-input]').val(data.tickets);

    element.find('[data-result-ticketsFor-section] [data-result-ticketsFor-paragraph]').text(data.ticketsFor);
    element.find('[data-result-ticketsFor-section] [data-result-ticketsFor-input]').val(data.ticketsFor);

    element.find('[data-result-notes-section] [data-result-notes-paragraph]').text(data.notes);
    element.find('[data-result-notes-section] [data-result-notes-input]').val(data.notes);

    element.find('[data-result-vehicles-section] [data-result-vehicles-paragraph]').text(data.vehicles);
    element.find('[data-result-vehicles-section] [data-result-vehicles-input]').val(data.vehicles);

    element.find('[data-result-mrd5-section] [data-result-mrd5-paragraph]').text(data.mrd5);
    element.find('[data-result-mrd5-section] [data-result-mrd5-input]').val(data.mrd5);

    element.find('[data-result-leads-section] [data-result-leads-paragraph]').text(data.leads);
    element.find('[data-result-leads-section] [data-result-leads-input]').val(data.leads);

    return element;
  }



  function handleDatatableRender(data) {
    resultsContainer.empty();
    data.forEach(function(result) {
      createElement(result).appendTo(resultsContainer);
    });
  }

  function getAllResults() {
    var requestUrl = apiRoot + 'getResults';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      success: handleDatatableRender
    });
  }




  function handleResultUpdateRequest() {
    var parentEl = $(this).parent().parent();
    var resultId = parentEl.attr('data-result-id');
    var resultData = parentEl.find('[data-result-day-input]').val();
    var resultPatrolType = parentEl.find('[data-result-patrolType-input]').val();
    var resultName = parentEl.find('[data-result-name-input]').val();
    var resultPeople = parentEl.find('[data-result-people-input]').val();
    var resultInterventions = parentEl.find('[data-result-interventions-input]').val();
    var resultInstruction = parentEl.find('[data-result-instruction-input]').val();
    var resultInstructionFor = parentEl.find('[data-result-instructionFor-input]').val();
    var resultTickets = parentEl.find('[data-results-ticket-input]').val();
    var resultTicketsFor = parentEl.find('[data-result-ticketsFor-input]').val();
    var resultNotes = parentEl.find('[data-result-notes-input]').val();
    var resultVehicles = parentEl.find('[data-result-vehicles-input]').val();
    var resultMrd5 = parentEl.find('[data-result-mrd5-input]').val();
    var resultLeads = parentEl.find('[data-result-leads-input]').val();

    var requestUrl = apiRoot + 'updateResult';

    $.ajax({
      url: requestUrl,
      method: "PUT",
      processData: false,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({

        id: resultId,
        day: resultData,
        patrolType: resultPatrolType,
        name: resultName,
        people: resultPeople,
        interventions: resultInterventions,
        instruction: resultInstruction,
        instructionFor: resultInstructionFor,
        tickets: resultTickets,
        ticketsFor: resultTicketsFor,
        notes: resultNotes,
        vehicles: resultVehicles,
        mrd5: resultMrd5,
        leads: resultLeads

      }),

      success: function(data) {
        parentEl.attr('data-result-id', data.id).toggleClass('datatable__row--editing');
        parentEl.find('[data-result-day-paragraph]').text(resultData);
        parentEl.find('[data-result-patrolType-paragraph]').text(resultPatrolType);
        parentEl.find('[data-result-name-paragraph]').text(resultName);
        parentEl.find('[data-result-people-paragraph]').text(resultPeople);
        parentEl.find('[data-result-interventions-paragraph]').text(resultInterventions);
        parentEl.find('[data-result-instruction-paragraph]').text(resultInstruction);
        parentEl.find('[data-result-instructionFor-paragraph]').text(resultInstructionFor);
        parentEl.find('[data-result-tickets-paragraph]').text(resultTickets);
        parentEl.find('[data-result-ticketsFor-paragraph]').text(resultTicketsFor);
        parentEl.find('[data-result-notes-paragraph]').text(resultNotes);
        parentEl.find('[data-result-vehicles-paragraph]').text(resultVehicles);
        parentEl.find('[data-result-mrd5-paragraph]').text(resultMrd5);
        parentEl.find('[data-result-leads-paragraph]').text(resultLeads);

      }
    });
  }



  function handleResultDeleteRequest() {
    var parentEl = $(this).parent().parent();
    var resultId = parentEl.attr('data-result-id');
    var requestUrl = apiRoot + 'deleteResult';

    $.ajax({
      url: requestUrl + '/?' + $.param({
        resultId: id
      }),
      method: 'DELETE',
      success: function() {
        parentEl.slideUp(400, function() { parentEl.remove();
 });
      }
    })
  }



  function handleResultSubmitRequest(event) {
    event.preventDefault();

    var resultData = $(this).find('[name="day"]').val();
    var resultPatrolType = $(this).find('[name="patrolType"]').val();
    var resultName = $(this).find('[name="name"]').val();
    var resultPeople = $(this).find('[name="people"]').val();
    var resultInterventions = $(this).find('[name="interventions"]').val();
    var resultInstruction = $(this).find('[name="instruction"]').val();
    var resultInstructionFor = $(this).find('[name="instructionFor"]').val();
    var resultTickets = $(this).find('[name="tickets"]').val();
    var resultTicketsFor = $(this).find('[name="ticketsFor"]').val();
    var resultNotes = $(this).find('[name="notes"]').val();
    var resultVehicles = $(this).find('[name="vehicles"]').val();
    var resultMrd5 = $(this).find('[name="mrd5"]').val();
    var resultLeads = $(this).find('[name="leads"]').val();

    var requestUrl = apiRoot + 'createResult';

    $.ajax({
      url: requestUrl,
      method: 'POST',
      processData: false,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({

        day: resultData,
        patrolType: resultPatrolType,
        name: resultName,
        people: resultPeople,
        interventions: resultInterventions,
        instruction: resultInstruction,
        instructionFor: resultInstructionFor,
        tickets: resultTickets,
        ticketsFor: resultTicketsFor,
        notes: resultNotes,
        vehicles: resultVehicles,
        mrd5: resultMrd5,
        leads: resultLeads

      }),
      complete: function(data) {
        if(data.status === 200) {
          getAllResults();
        }
      }
    });
  }


  function toggleEditingState() {
    var parentEl = $(this).parent().parent();
    parentEl.toggleClass('datatable__row--editing');

    var resultData = parentEl.find('[data-result-day-paragraph]').text();
    var resultPatrolType = parentEl.find('[data-result-patrolType-paragraph]').text();
    var resultName = parentEl.find('[data-result-name-paragraph]').text();
    var resultPeople = parentEl.find('[data-result-patrolType-paragraph]').text();
    var resultInterventions = parentEl.find('[data-result-interventions-paragraph]').text();
    var resultInstructionFor = parentEl.find('[data-result-instructionFor-paragraph]').text();
    var resultTickets = parentEl.find('[data-result-tickets-paragraph]').text();
    var resultTicketsFor = parentEl.find('[data-result-ticketsFor-paragraph]').text();
    var resultNotes = parentEl.find('[data-result-notes-paragraph]').text();
    var resultVehicles = parentEl.find('[data-result-vehicles-paragraph]').text();
    var resultMrd5 = parentEl.find('[data-result-mrd5-paragraph]').text();
    var resultLeads = parentEl.find('[data-result-leads-paragraph]').text();

        parentEl.find('[data-result-day-paragraph]').text(resultData);
        parentEl.find('[data-result-patrolType-paragraph]').text(resultPatrolType);
        parentEl.find('[data-result-name-paragraph]').text(resultName);
        parentEl.find('[data-result-people-paragraph]').text(resultPeople);
        parentEl.find('[data-result-interventions-paragraph]').text(resultInterventions);
        parentEl.find('[data-result-instruction-paragraph]').text(resultInstruction);
        parentEl.find('[data-result-instructionFor-paragraph]').text(resultInstructionFor);
        parentEl.find('[data-result-tickets-paragraph]').text(resultTickets);
        parentEl.find('[data-result-ticketsFor-paragraph]').text(resultTicketsFor);
        parentEl.find('[data-result-notes-paragraph]').text(resultNotes);
        parentEl.find('[data-result-vehicles-paragraph]').text(resultVehicles);
        parentEl.find('[data-result-mrd5-paragraph]').text(resultMrd5);
        parentEl.find('[data-result-leads-paragraph]').text(resultLeads);


  }

  $('[data-result-add-form]').on('submit', handleResultSubmitRequest);

  resultsContainer.on('click','[data-result-edit-button]', toggleEditingState);
  resultsContainer.on('click','[data-result-edit-abort-button]', toggleEditingState);
  resultsContainer.on('click','[data-result-submit-update-button]', handleResultUpdateRequest);
  resultsContainer.on('click','[data-result-delete-button]', handleResultDeleteRequest);
});
