import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { NumToMonth } from '../JobEnums';
import { CheckBoxContext, DateOfJobContext } from './context/JobContext';

type CheckBoxProps = {
    listOfMonthsFromDB: string[]
}

var monthList: string[] = []

function sorted(monthList: string[], listOfMonthsFromDB: string[]) {
    var sortList: string[] = []
    for (let index = 0; index < listOfMonthsFromDB.length; index++) {
        monthList.includes(listOfMonthsFromDB[index]) && sortList.push(listOfMonthsFromDB[index])
    }
    return sortList
}

export const CheckBox = ({ listOfMonthsFromDB }: CheckBoxProps) => {

    let dateOfJobContext = useContext(DateOfJobContext)
    let checkBoxContext = useContext(CheckBoxContext)

    const onChecked = (e: React.ChangeEvent<HTMLInputElement>, listOfMonthsFromDB: string[]) => {
        const month = e.currentTarget;

        monthList = checkBoxContext.selectedMonths!.month // get the initial month and then sorted selected month
        // PASS CHECKED MONTH VALUE INTO A TEMP LIST
        if (month.checked) {
            monthList.push(month.value)

        } else {
            monthList.splice(monthList.indexOf(month.value), 1)
        }
        // SORT 
        monthList = sorted(monthList, listOfMonthsFromDB)
        checkBoxContext.setSelectedMonths({ month: monthList })
    }

    // SET DEFAULT MONTH TO LATEST MONTH 
    function defaultchecked(m: string): boolean {
        let check: boolean
        m == dateOfJobContext.latestMonth ? check = true : check = false
        return check
    }

    return (
        <>
            <div>
                <h4 style={{ textAlign: 'left' }}>
                    Select Month
                </h4>
            </div>
            <div style={{ textAlign: "left" }}>
                {listOfMonthsFromDB.map((m: string) => (
                    <h6 key={m}>
                        <Form.Check
                            key={m}
                            inline
                            label={NumToMonth[m]}
                            name="checkBox"
                            type={'checkbox'}
                            value={m}
                            id={`checked-${m}`}
                            className="mb-1"
                            defaultChecked={defaultchecked(m)}
                            onChange={(e) => onChecked(e, listOfMonthsFromDB)}
                        />
                    </h6>
                ))}
            </div>
        </>
    );
}

