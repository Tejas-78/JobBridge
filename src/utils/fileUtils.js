import { v4 as uniqueId } from 'uuid';
import nodemailer from 'nodemailer';

import fs from 'fs';
import path from 'path';

export const readJSONFile = async (filePath) => {
    try {
        const data = fs.readFileSync(path.resolve(filePath), {encoding:'utf-8'});
        return JSON.parse(data);
    } catch (err) {
        console.error('Error in json fie reading or parsing JSON file:', err);
        return [];  
    }
};

export const writeJSONFile = async (filePath, data) => {
    try {
        fs.writeFileSync(path.resolve(filePath), JSON.stringify(data, null, 2), {encoding:'utf-8'});
    } catch (err) {
        console.error('Error writing JSON file:', err);
    }
};


export const generateUniqueId = () => {
    return uniqueId();
};

export async function sendApplicationEmail(email, jobTitle) {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: 'shobhitjadhav789@gmail.com',
          pass: 'aqnr xzgt ksys wuyt' 
        }
    });
  const mailOptions = {
    from: 'shobhitjadhav789@gmail.com',
    to:email,
    subject: `Application Received for ${jobTitle}`,
    text: `Thank you for applying for the position of ${jobTitle}. We have received your application and will review it shortly.`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
