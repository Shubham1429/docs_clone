import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useRouter } from 'next/dist/client/router'
import Dropdown from '@material-tailwind/react/Dropdown'
import DropdownLink from "@material-tailwind/react/DropdownLink"
import { useSession } from 'next-auth/client'
import { db } from '../firebase'

function DocumentRow({ id, fileName, date }) {
    const router = useRouter();
    const [session] = useSession();

    const removeDocument = () => {
        db.collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .doc(id)
            .delete()
    }
    return (
        <div>
            { fileName.length ?
                <div className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer'>
                    <Icon name='article' size='3xl' color='blue' />
                    <p className='flex-grow pl-5 w-10 pr-10 truncate' onClick={() => router.push(`/doc/${id}`)}>{fileName}</p>
                    <p className='pr-5 text-sm'>{date?.toDate().toLocaleDateString()}</p>
                    <Dropdown
                        color='gray'
                        buttonType='link'
                        ripple='dark'
                        buttonText='More'
                        style={{
                            fontWeight: 400
                        }}
                        rounded={true}
                        placement='bottom-start'
                        size='sm'
                        block={false}
                    >
                        <DropdownLink
                            color='gray'
                            onClick={removeDocument}
                        >
                            <span className='flex items-center text-sm justify-around'>
                                <Icon name='delete_outline' /> Remove
                            </span>
                        </DropdownLink>
                    </Dropdown>
                </div> :
                <h1 className='text-gray-600'>Hello</h1>
            }
        </div>

    )
}

export default DocumentRow
