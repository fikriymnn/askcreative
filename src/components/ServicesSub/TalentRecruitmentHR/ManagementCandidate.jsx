import React from 'react'
import CompanyRegistration from '../../CompanyRegistrationCard'
import CompanyRegistrationCard from '../../CompanyRegistrationCard'
function ManagementCandidate() {
    const Card1 = (

        <CompanyRegistrationCard src={"/foto.jpg"}
            title={"Company Registration Basic Regulation"}
            price={
                "3000-2000"
            } />
    );


    const CompanyReg = [
        Card1,
    ]
    return (
        <>


            {CompanyReg}
        </>
    )
}

export default ManagementCandidate