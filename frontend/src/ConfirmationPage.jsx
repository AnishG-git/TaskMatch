import React from 'react';
import { useLocation } from 'wouter';

function ConfirmationPage() {
    const [location, params] = useLocation();
    const { task } = params;  // Assuming the task details are passed as URL parameters or through global state management

    return (
        <div style={{
            position: 'relative',
            width: '1440px',
            height: '1024px',
            background: 'linear-gradient(180deg, #224489 20.1%, #1E3C79 46.6%, #091123 100%)'
        }}>
            <h1 style={{
                position: 'absolute',
                width: '427px',
                height: '68px',
                left: '506px',
                top: '83px',
                fontFamily: 'Manrope',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '65px',
                lineHeight: '89px',
                color: '#FFFFFF'
            }}>
                Confirmation
            </h1>

            <p style={{
                position: 'absolute',
                width: '1416px',
                height: '61px',
                left: '0px',
                top: '197px',
                fontFamily: 'Julius Sans One',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '36px',
                lineHeight: '39px',
                textAlign: 'center',
                color: '#FFFFFF'
            }}>
                Please confirm your booking below
            </p>

            <p style={{
                position: 'absolute',
                width: '540px',
                height: '46px',
                left: '102px',
                top: '366px',
                fontFamily: 'Julius Sans One',
                textAlign: 'center',
                fontSize: '36px',
                lineHeight: '39px',
                color: '#FFFFFF'
            }}>
                Service: {task.text}
            </p>

            <p style={{
                position: 'absolute',
                width: '387px',
                height: '46px',
                left: '102px',
                top: '416px',
                fontFamily: 'Julius Sans One',
                textAlign: 'center',
                fontSize: '36px',
                lineHeight: '39px',
                color: '#FFFFFF'
            }}>
                Location: {task.contractor}
            </p>

            <p style={{
                position: 'absolute',
                width: '307px',
                height: '46px',
                left: '910px',
                top: '351px',
                fontFamily: 'Julius Sans One',
                textAlign: 'center',
                fontSize: '36px',
                lineHeight: '39px',
                color: '#FFFFFF'
            }}>
                Date: {task.date}
            </p>

            <p style={{
                position: 'absolute',
                width: '268px',
                height: '63px',
                left: '910px',
                top: '419px',
                fontFamily: 'Julius Sans One',
                fontSize: '36px',
                lineHeight: '39px',
                color: '#FFFFFF'
            }}>
                ZIP: {task.zip}
            </p>

            <p style={{
                position: 'absolute',
                width: '310px',
                height: '38px',
                left: '563px',
                top: '531px',
                fontFamily: 'Julius Sans One',
                fontSize: '36px',
                lineHeight: '39px',
                color: '#FFFFFF'
            }}>
                Special Request:
            </p>

            <div style={{
                position: 'absolute',
                width: '950px',
                height: '109px',
                left: '245px',
                top: '596px',
                background: '#D9D9D9',
                borderRadius: '10px',
            }}>
                <p style={{
                    width: '100%',
                    textAlign: 'center',
                    lineHeight: '109px',
                    fontSize: '25px',
                    color: '#000000'
                }}>
                    Please arrive 10 minutes early
                </p>
            </div>

            <button style={{
                position: 'absolute',
                width: '215px',
                height: '74px',
                left: '1002px',
                top: '798px',
                background: '#D2FEFE',
                borderRadius: '20px',
                fontFamily: 'Nikukyu',
                fontSize: '36px',
                lineHeight: '36px',
                textAlign: 'center',
                color: '#000000',
                border: 'none',
                cursor: 'pointer'
            }}>
                Confirm
            </button>

            <button style={{
                position: 'absolute',
                width: '215px',
                height: '74px',
                left: '1002px',
                top: '894px',
                background: '#D2DEFE',
                borderRadius: '20px',
                fontFamily: 'Nikukyu',
                fontSize: '20px',
                lineHeight: '20px',
                textAlign: 'center',
                color: '#000000',
                border: 'none',
                cursor: 'pointer'
            }}>
                Contact Contractor
            </button>
        </div>
    );
}

export default ConfirmationPage;
