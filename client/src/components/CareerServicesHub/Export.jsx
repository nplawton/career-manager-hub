import React, {useContext, useState} from 'react';
import exportFromJSON from 'export-from-json';
import { StudentsContext } from '../../context/studentsContext';

function Export() {

  const [currentCohort, setCurrentCohort] = useState('');

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;
  console.log(students);

  const cohorts = ['MCSP-16', 'MCSP-17', 'MCSP-18', 'MCSP-19', 'MCSP-20', 'MCSP-21', 'MCSP-22'];
  const fields = ['cohort', 'student_first', 'student_last', 'sec_clearance', 'hired'];
  const milestoneFields = [{ name: 'mile_name' }, { name: 'progress_stat' }];
  const milestoneColumns = milestoneFields.map(field => `milestones.${field.name}`);
  const allFields = fields.concat(milestoneColumns);

  const onExportToCsv = () => {
    const selectedCohort = students.filter(student => student.cohort === currentCohort)
      .flatMap(student => {
        return student.milestones.map(milestone => ({
          ...student,
          'milestones.mile_name': milestone.mile_name,
          'milestones.progress_stat': milestone.progress_stat
        }))
    });

    const data = selectedCohort;
    const fileName = `${currentCohort}_report`;
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({data, fileName, fields: allFields, exportType});
  }

  return (
    <div>
      <button
        onClick={onExportToCsv}
      >
        Export to CSV
      </button>
      <select
        value={currentCohort}
        onChange={(e) => setCurrentCohort(e.target.value)}
      >
        <option value=''>Select a MCSP</option>
        {
          cohorts.map((cohort, index) => {
            return(
              <option
                key={index}
                value={cohort}
              >
                {cohort}
              </option>
            )
          })
        }
      </select>
    </div>
  )
}

export default Export;