import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';
import {useRouter} from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/buttonSendStickers'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNTU4NCwiZXhwIjoxOTU4ODgxNTg0fQ.w7RIszHfwogOxjYq2aQLX5k40mUfRjabSN3NGVAcSEM'
const SUPABASE_URL = 'https://hxijtkoozkemxzgrazmc.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const roteamento = useRouter();
    const usuLog = roteamento.query.username;
    console.log('usuário:', usuLog);
    console.log('rotamento:', roteamento.query);
    const [mensagem, setMensagem] = React.useState('');
    const [ListMessage, setListMessage] = React.useState([ ]);

    function MessageReal(addMessage) {
        return supabaseClient
        .from('Mensagem')
        .on('INSERT', ({respostalive}) => {
            addMessage(respostalive.new)
        })
        .subscribe();
    }

    React.useEffect(() => {
        supabaseClient
        .from('Mensagem')
        .select('*')
        .order('id', {ascending: false})
        .then(({data}) => {
            //console.log(data)
            setListMessage(data);
});
    MessageReal( (novaMensagem) => {
        setListMessage((valorAtual) => {
            return [
                novaMensagem,
                ...valorAtual,
            ]
        });
    });
    }, []);
    
    // ./Sua lógica vai aqui
    function handleNewmessage(newMessage){
        const mensagens = {
            de: usuLog,
            texto: newMessage,
        };

        supabaseClient
            .from('Mensagem')
            .insert([
                mensagens
            ])
            .then(({data}) => {
                console.log('criando mensagem', data)
            })

        //setListMessage([
         //   mensagens,
           // ...ListMessage,
            
        // ]);]
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                    height: '95%',
                    maxWidth: '80%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{

                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[500],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >  

                    <MessageList mensagens={ListMessage} />
                    {/*ListMessage.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                            {mensagemAtual.de}: {mensagemAtual.texto}</li>
                        )
                    })*/}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) =>{
                                if(event.key == 'Enter'){
                                    event.preventDefault();
                                    handleNewmessage(mensagem);
                                }                                
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker 
                        onStickerClick={(sticker) => {
                            handleNewmessage(':sticker:' + sticker);
                        }}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >

            {props.mensagens.map((mensagem) => {
                return (
                    
            <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[400],
                }
            }}
        >
            <Box
                styleSheet={{
                    marginBottom: '8px',
                }}
            >
                <Image
                    styleSheet={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '8px',
                    }}
                    src={`https://github.com/${mensagem.de}.png`}
                />
                <Text tag="strong">
                {mensagem.de}
                </Text>
                <Text
                    styleSheet={{
                        fontSize: '10px',
                        marginLeft: '8px',
                        color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                >
                    {(new Date().toLocaleDateString())}
                </Text>
            </Box>
             {mensagem.texto.startsWith(':sticker:')
             ? (
                <Image src={mensagem.texto.replace(':sticker:', '')}
                    styleSheet={{
                        width: '12rem',
                        heigth: '12rem',
                    }}
                />

             )
             : (
                 mensagem.texto
             )
             }
       </Text>
                )
            }
            )}

        </Box>
    )
}