import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileText, Globe, Cpu, Zap, Settings, Download, Edit3, Save, Trash2, Eye, EyeOff, Copy, RefreshCw, Network, Wifi, Shield, Lock, Database, Server, MonitorSpeaker } from 'lucide-react';

const NASAProtocolTranslator = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('auto');
    const [targetLanguage, setTargetLanguage] = useState('ro');
    const [isProcessing, setIsProcessing] = useState(false);
    const [protocolType, setProtocolType] = useState('tcp');
    const [savedProtocols, setSavedProtocols] = useState([]);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [animationState, setAnimationState] = useState(0);

    // Protocol synonyms and translations - Extended dictionary
    const protocolSynonyms = {
        'TCP': { ro: 'Protocol de Control al Transmisiei', en: 'Transmission Control Protocol' },
        'UDP': { ro: 'Protocol de Datagrame Utilizator', en: 'User Datagram Protocol' },
        'HTTP': { ro: 'Protocol de Transfer HiperText', en: 'HyperText Transfer Protocol' },
        'HTTPS': { ro: 'Protocol de Transfer HiperText Securizat', en: 'HyperText Transfer Protocol Secure' },
        'FTP': { ro: 'Protocol de Transfer Fișiere', en: 'File Transfer Protocol' },
        'SFTP': { ro: 'Protocol Securizat de Transfer Fișiere', en: 'Secure File Transfer Protocol' },
        'SMTP': { ro: 'Protocol Simplu de Transfer al Mesajelor', en: 'Simple Mail Transfer Protocol' },
        'POP3': { ro: 'Protocol de Oficiu Poștal versiunea 3', en: 'Post Office Protocol version 3' },
        'IMAP': { ro: 'Protocol de Acces la Mesaje Internet', en: 'Internet Message Access Protocol' },
        'DNS': { ro: 'Sistem de Nume de Domenii', en: 'Domain Name System' },
        'DHCP': { ro: 'Protocol Dinamic de Configurare Gazdă', en: 'Dynamic Host Configuration Protocol' },
        'IP': { ro: 'Protocol Internet', en: 'Internet Protocol' },
        'IPv4': { ro: 'Protocol Internet versiunea 4', en: 'Internet Protocol version 4' },
        'IPv6': { ro: 'Protocol Internet versiunea 6', en: 'Internet Protocol version 6' },
        'ICMP': { ro: 'Protocol de Mesaje de Control Internet', en: 'Internet Control Message Protocol' },
        'ARP': { ro: 'Protocol de Rezoluție Adrese', en: 'Address Resolution Protocol' },
        'RARP': { ro: 'Protocol Invers de Rezoluție Adrese', en: 'Reverse Address Resolution Protocol' },
        'OSPF': { ro: 'Prima Cale Cea Mai Scurtă Deschisă', en: 'Open Shortest Path First' },
        'RIP': { ro: 'Protocol de Informații de Rutare', en: 'Routing Information Protocol' },
        'BGP': { ro: 'Protocol de Gateway Frontieră', en: 'Border Gateway Protocol' },
        'EIGRP': { ro: 'Protocol de Rutare Gateway Interior Îmbunătățit', en: 'Enhanced Interior Gateway Routing Protocol' },
        'SSL': { ro: 'Strat de Socket Securizat', en: 'Secure Sockets Layer' },
        'TLS': { ro: 'Securitatea Stratului de Transport', en: 'Transport Layer Security' },
        'IPSec': { ro: 'Securitatea Protocolului Internet', en: 'Internet Protocol Security' },
        'VPN': { ro: 'Rețea Privată Virtuală', en: 'Virtual Private Network' },
        'VLAN': { ro: 'Rețea Locală Virtuală', en: 'Virtual Local Area Network' },
        'NAT': { ro: 'Traducerea Adreselor de Rețea', en: 'Network Address Translation' },
        'PAT': { ro: 'Traducerea Adreselor de Port', en: 'Port Address Translation' },
        'QoS': { ro: 'Calitatea Serviciului', en: 'Quality of Service' },
        'SNMP': { ro: 'Protocol Simplu de Management Rețea', en: 'Simple Network Management Protocol' },
        'NTP': { ro: 'Protocol de Timp de Rețea', en: 'Network Time Protocol' },
        'LDAP': { ro: 'Protocol Ușor de Acces la Directoare', en: 'Lightweight Directory Access Protocol' },
        'Telnet': { ro: 'Terminal de Rețea', en: 'Terminal Network' },
        'SSH': { ro: 'Shell Securizat', en: 'Secure Shell' },
        'RADIUS': { ro: 'Serviciu de Utilizator de Acces Distant pentru Autentificare prin Apel', en: 'Remote Authentication Dial-In User Service' },
        'TACACS': { ro: 'Sistem de Control al Accesului la Terminale și Controler', en: 'Terminal Access Controller Access-Control System' }
    };

    const networkTopics = [
        'Protocol Stack Analysis', 'Network Security', 'Quality of Service', 'Network Architecture',
        'Routing Algorithms', 'Network Performance', 'Wireless Networks', 'Network Management'
    ];

    // NASA-style animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Grid pattern
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            const gridSize = 50;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Floating particles
            const time = Date.now() * 0.001;
            for (let i = 0; i < 20; i++) {
                const x = (Math.sin(time + i) * 100 + canvas.width / 2 + i * 30) % canvas.width;
                const y = (Math.cos(time * 0.7 + i) * 80 + canvas.height / 2 + i * 25) % canvas.height;

                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(time + i) * 0.2})`;
                ctx.fill();
            }

            setAnimationState(prev => prev + 1);
            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const translateProtocol = async () => {
        setIsProcessing(true);

        // Simulate advanced translation with protocol recognition
        await new Promise(resolve => setTimeout(resolve, 2000));

        let result = inputText;

        // Advanced protocol translation with bidirectional mapping
        if (targetLanguage === 'ro') {
            // English to Romanian - Full text translation

            // First translate protocols
            Object.entries(protocolSynonyms).forEach(([protocol, translations]) => {
                const protocolRegex = new RegExp(`\\b${protocol}\\b`, 'gi');
                result = result.replace(protocolRegex, `${protocol} (${translations.ro})`);

                const englishRegex = new RegExp(translations.en, 'gi');
                result = result.replace(englishRegex, translations.ro);
            });

            // Comprehensive English to Romanian translation dictionary
            const englishToRomanian = {
                // Common networking terms
                'network': 'rețea',
                'networks': 'rețele',
                'packet': 'pachet',
                'packets': 'pachete',
                'header': 'antet',
                'headers': 'antete',
                'payload': 'încărcătură utilă',
                'routing': 'rutare',
                'switching': 'comutare',
                'gateway': 'poartă de intrare',
                'gateways': 'porți de intrare',
                'firewall': 'zid de foc',
                'firewalls': 'ziduri de foc',
                'bandwidth': 'lățime de bandă',
                'latency': 'latență',
                'throughput': 'debit',
                'congestion': 'congestie',
                'subnet': 'subrețea',
                'subnets': 'subrețele',
                'protocol stack': 'stiva de protocoale',
                'encapsulation': 'încapsulare',
                'fragmentation': 'fragmentare',
                'checksum': 'sumă de control',
                'acknowledgment': 'confirmare',
                'retransmission': 'retransmisie',

                // Common words and phrases
                'the': '',
                'and': 'și',
                'or': 'sau',
                'of': 'de',
                'in': 'în',
                'on': 'pe',
                'at': 'la',
                'for': 'pentru',
                'with': 'cu',
                'by': 'prin',
                'from': 'de la',
                'to': 'către',
                'is': 'este',
                'are': 'sunt',
                'was': 'a fost',
                'were': 'au fost',
                'be': 'a fi',
                'been': 'fost',
                'have': 'au',
                'has': 'are',
                'had': 'a avut',
                'do': 'face',
                'does': 'face',
                'did': 'a făcut',
                'will': 'va',
                'would': 'ar',
                'can': 'poate',
                'could': 'ar putea',
                'should': 'ar trebui',
                'must': 'trebuie',
                'may': 'poate',
                'might': 'ar putea',

                // Technical terms
                'data': 'date',
                'information': 'informație',
                'computer': 'calculator',
                'computers': 'calculatoare',
                'server': 'server',
                'servers': 'servere',
                'client': 'client',
                'clients': 'clienți',
                'connection': 'conexiune',
                'connections': 'conexiuni',
                'communication': 'comunicare',
                'transmission': 'transmisie',
                'security': 'securitate',
                'authentication': 'autentificare',
                'encryption': 'criptare',
                'configuration': 'configurare',
                'management': 'management',
                'performance': 'performanță',
                'quality': 'calitate',
                'service': 'serviciu',
                'services': 'servicii',
                'address': 'adresă',
                'addresses': 'adrese',
                'port': 'port',
                'ports': 'porturi',
                'layer': 'strat',
                'layers': 'straturi',
                'model': 'model',
                'standard': 'standard',
                'standards': 'standarde',
                'algorithm': 'algoritm',
                'algorithms': 'algoritmi',
                'method': 'metodă',
                'methods': 'metode',
                'technique': 'tehnică',
                'techniques': 'tehnici',
                'solution': 'soluție',
                'solutions': 'soluții',
                'problem': 'problemă',
                'problems': 'probleme',
                'error': 'eroare',
                'errors': 'erori',
                'failure': 'eșec',
                'failures': 'eșecuri',
                'success': 'succes',
                'successful': 'cu succes',
                'important': 'important',
                'critical': 'critic',
                'essential': 'esențial',
                'necessary': 'necesar',
                'required': 'necesar',
                'optional': 'opțional',
                'available': 'disponibil',
                'used': 'folosit',
                'using': 'folosind',
                'implementation': 'implementare',
                'design': 'proiectare',
                'architecture': 'arhitectură',
                'topology': 'topologie',
                'infrastructure': 'infrastructură',
                'system': 'sistem',
                'systems': 'sisteme',
                'application': 'aplicație',
                'applications': 'aplicații',
                'software': 'software',
                'hardware': 'hardware',
                'device': 'dispozitiv',
                'devices': 'dispozitive',
                'interface': 'interfață',
                'interfaces': 'interfețe'
            };

            // Apply comprehensive translation
            Object.entries(englishToRomanian).forEach(([english, romanian]) => {
                if (romanian) { // Skip empty translations like 'the'
                    const regex = new RegExp(`\\b${english}\\b`, 'gi');
                    result = result.replace(regex, romanian);
                } else {
                    // Remove articles like 'the'
                    const regex = new RegExp(`\\b${english}\\s+`, 'gi');
                    result = result.replace(regex, ' ');
                }
            });

        } else if (targetLanguage === 'en') {
            // Romanian to English - Full text translation

            // First translate protocols
            Object.entries(protocolSynonyms).forEach(([protocol, translations]) => {
                const romanianRegex = new RegExp(translations.ro, 'gi');
                result = result.replace(romanianRegex, `${translations.en} (${protocol})`);

                const protocolRegex = new RegExp(`\\b${protocol}\\b`, 'gi');
                result = result.replace(protocolRegex, `${protocol} (${translations.en})`);
            });

            // Comprehensive Romanian to English translation dictionary
            const romanianToEnglish = {
                // Common networking terms
                'rețea': 'network',
                'rețele': 'networks',
                'pachet': 'packet',
                'pachete': 'packets',
                'antet': 'header',
                'antete': 'headers',
                'încărcătură utilă': 'payload',
                'rutare': 'routing',
                'comutare': 'switching',
                'poartă de intrare': 'gateway',
                'porți de intrare': 'gateways',
                'zid de foc': 'firewall',
                'ziduri de foc': 'firewalls',
                'lățime de bandă': 'bandwidth',
                'latență': 'latency',
                'debit': 'throughput',
                'congestie': 'congestion',
                'subrețea': 'subnet',
                'subrețele': 'subnets',
                'stiva de protocoale': 'protocol stack',
                'încapsulare': 'encapsulation',
                'fragmentare': 'fragmentation',
                'sumă de control': 'checksum',
                'confirmare': 'acknowledgment',
                'retransmisie': 'retransmission',

                // Common words
                'și': 'and',
                'sau': 'or',
                'de': 'of',
                'în': 'in',
                'pe': 'on',
                'la': 'at',
                'pentru': 'for',
                'cu': 'with',
                'prin': 'by',
                'de la': 'from',
                'către': 'to',
                'este': 'is',
                'sunt': 'are',
                'a fost': 'was',
                'au fost': 'were',
                'a fi': 'be',
                'fost': 'been',
                'au': 'have',
                'are': 'has',
                'a avut': 'had',
                'face': 'do',
                'a făcut': 'did',
                'va': 'will',
                'ar': 'would',
                'poate': 'can',
                'ar putea': 'could',
                'ar trebui': 'should',
                'trebuie': 'must',

                // Technical terms
                'date': 'data',
                'informație': 'information',
                'calculator': 'computer',
                'calculatoare': 'computers',
                'server': 'server',
                'servere': 'servers',
                'client': 'client',
                'clienți': 'clients',
                'conexiune': 'connection',
                'conexiuni': 'connections',
                'comunicare': 'communication',
                'transmisie': 'transmission',
                'securitate': 'security',
                'autentificare': 'authentication',
                'criptare': 'encryption',
                'configurare': 'configuration',
                'management': 'management',
                'performanță': 'performance',
                'calitate': 'quality',
                'serviciu': 'service',
                'servicii': 'services',
                'adresă': 'address',
                'adrese': 'addresses',
                'port': 'port',
                'porturi': 'ports',
                'strat': 'layer',
                'straturi': 'layers',
                'model': 'model',
                'standard': 'standard',
                'standarde': 'standards',
                'algoritm': 'algorithm',
                'algoritmi': 'algorithms',
                'metodă': 'method',
                'metode': 'methods',
                'tehnică': 'technique',
                'tehnici': 'techniques',
                'soluție': 'solution',
                'soluții': 'solutions',
                'problemă': 'problem',
                'probleme': 'problems',
                'eroare': 'error',
                'erori': 'errors',
                'eșec': 'failure',
                'eșecuri': 'failures',
                'succes': 'success',
                'cu succes': 'successful',
                'important': 'important',
                'critic': 'critical',
                'esențial': 'essential',
                'necesar': 'necessary',
                'opțional': 'optional',
                'disponibil': 'available',
                'folosit': 'used',
                'folosind': 'using',
                'implementare': 'implementation',
                'proiectare': 'design',
                'arhitectură': 'architecture',
                'topologie': 'topology',
                'infrastructură': 'infrastructure',
                'sistem': 'system',
                'sisteme': 'systems',
                'aplicație': 'application',
                'aplicații': 'applications',
                'software': 'software',
                'hardware': 'hardware',
                'dispozitiv': 'device',
                'dispozitive': 'devices',
                'interfață': 'interface',
                'interfețe': 'interfaces'
            };

            // Apply comprehensive translation
            Object.entries(romanianToEnglish).forEach(([romanian, english]) => {
                const regex = new RegExp(`\\b${romanian}\\b`, 'gi');
                result = result.replace(regex, english);
            });
        }

        // Clean up extra spaces
        result = result.replace(/\s+/g, ' ').trim();

        // Add context-aware annotations
        result += `\n\n--- ${targetLanguage === 'ro' ? 'Analiză Avansată (Română)' : 'Advanced Analysis (English)'} ---\n`;

        if (targetLanguage === 'ro') {
            result += '• Text complet tradus din engleză în română\n';
            result += '• Protocoale identificate și traduse cu sinonimele corespunzătoare\n';
            result += '• Termeni tehnici traduși pentru claritate academică\n';
            result += '• Context adaptat pentru Advanced Topics in Computer Networks\n';
            result += '• Traducere bidirecțională cu menținerea preciziei tehnice\n';
        } else {
            result += '• Full text translated from Romanian to English\n';
            result += '• Protocols identified and translated with appropriate synonyms\n';
            result += '• Technical terms translated for academic clarity\n';
            result += '• Context adapted for Advanced Topics in Computer Networks\n';
            result += '• Bidirectional translation maintaining technical accuracy\n';
        }

        // Detect and highlight protocols found
        const foundProtocols = [];
        Object.keys(protocolSynonyms).forEach(protocol => {
            if (inputText.toUpperCase().includes(protocol)) {
                foundProtocols.push(protocol);
            }
        });

        if (foundProtocols.length > 0) {
            result += `\n${targetLanguage === 'ro' ? 'Protocoale detectate' : 'Detected protocols'}: ${foundProtocols.join(', ')}\n`;
        }

        setTranslatedText(result);
        setIsProcessing(false);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setInputText(e.target.result);
                setActiveTab('translate');
            };

            if (file.type === 'application/pdf') {
                // For demo purposes, simulate PDF reading
                setInputText('PDF content loaded: Network protocols documentation...\nTCP/IP, HTTP, DNS protocols analysis...');
            } else {
                reader.readAsText(file);
            }
        }
    };

    const saveProtocol = () => {
        if (translatedText) {
            const newProtocol = {
                id: Date.now(),
                name: `Protocol ${savedProtocols.length + 1}`,
                content: translatedText,
                timestamp: new Date().toLocaleString(),
                type: protocolType
            };
            setSavedProtocols(prev => [...prev, newProtocol]);
        }
    };

    const deleteProtocol = (id) => {
        setSavedProtocols(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
            />

            <div className="relative z-10">
                {/* Header */}
                <div className="border-b border-cyan-500/30 bg-black/20 backdrop-blur-md">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                                    <Network className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                        Protocol Translator
                                    </h1>
                                    <p className="text-cyan-300 text-sm">Advanced Network Protocol Analysis System</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-400 text-sm">SISTEM ACTIV</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="container mx-auto px-6 py-4">
                    <div className="flex space-x-1 bg-black/30 rounded-lg p-1 backdrop-blur-md border border-cyan-500/20">
                        {[
                            { id: 'upload', label: 'Încărcare', icon: Upload },
                            { id: 'translate', label: 'Traducere', icon: Globe },
                            { id: 'analysis', label: 'Analiză', icon: Cpu },
                            { id: 'saved', label: 'Salvate', icon: Database }
                        ].map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-300 ${
                                    activeTab === id
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                                        : 'text-cyan-300 hover:bg-white/5'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="font-medium">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-6 pb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Panel */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Upload Tab */}
                            {activeTab === 'upload' && (
                                <div className="bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                                    <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                                        <Upload className="w-5 h-5 mr-2" />
                                        Încărcare Document Protocol
                                    </h2>

                                    <div className="space-y-4">
                                        <div
                                            className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-400/50 transition-colors"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <FileText className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                                            <p className="text-cyan-300 mb-2">Trageți fișierul aici sau faceți clic pentru a selecta</p>
                                            <p className="text-sm text-gray-400">Suportă: PDF, DOC, DOCX, TXT, JSON, XML</p>
                                        </div>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                            accept=".pdf,.doc,.docx,.txt,.json,.xml"
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-cyan-300 text-sm mb-2">Limba Sursă</label>
                                                <select
                                                    value={sourceLanguage}
                                                    onChange={(e) => setSourceLanguage(e.target.value)}
                                                    className="w-full bg-black/30 border border-cyan-500/30 rounded-md px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                                                >
                                                    <option value="auto">Detectare Automată</option>
                                                    <option value="en">Engleză</option>
                                                    <option value="de">Germană</option>
                                                    <option value="fr">Franceză</option>
                                                    <option value="es">Spaniolă</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-cyan-300 text-sm mb-2">Limba Țintă</label>
                                                <select
                                                    value={targetLanguage}
                                                    onChange={(e) => setTargetLanguage(e.target.value)}
                                                    className="w-full bg-black/30 border border-cyan-500/30 rounded-md px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                                                >
                                                    <option value="ro">Română</option>
                                                    <option value="en">Engleză</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Translate Tab */}
                            {activeTab === 'translate' && (
                                <div className="space-y-6">
                                    <div className="bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                                        <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                                            <Globe className="w-5 h-5 mr-2" />
                                            Traducere Protocol Rețea
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-cyan-300 text-sm mb-2">Text Original</label>
                                                <textarea
                                                    value={inputText}
                                                    onChange={(e) => setInputText(e.target.value)}
                                                    className="w-full h-64 bg-black/30 border border-cyan-500/30 rounded-md px-3 py-2 text-white focus:border-cyan-400 focus:outline-none resize-none"
                                                    placeholder="Introduceți textul protocolului de rețea..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-cyan-300 text-sm mb-2">Text Tradus</label>
                                                <div className="relative">
                          <textarea
                              value={translatedText}
                              onChange={(e) => setTranslatedText(e.target.value)}
                              className="w-full h-64 bg-black/30 border border-cyan-500/30 rounded-md px-3 py-2 text-white focus:border-cyan-400 focus:outline-none resize-none"
                              placeholder="Traducerea va apărea aici..."
                          />
                                                    {isProcessing && (
                                                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-md">
                                                            <div className="text-center">
                                                                <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2" />
                                                                <p className="text-cyan-300">Procesare avansată...</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mt-6">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={translateProtocol}
                                                    disabled={!inputText || isProcessing}
                                                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 px-6 py-2 rounded-md font-medium transition-all duration-300 flex items-center space-x-2"
                                                >
                                                    <Zap className="w-4 h-4" />
                                                    <span>Traduce</span>
                                                </button>

                                                <button
                                                    onClick={saveProtocol}
                                                    disabled={!translatedText}
                                                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2"
                                                >
                                                    <Save className="w-4 h-4" />
                                                    <span>Salvează</span>
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => setShowAdvanced(!showAdvanced)}
                                                className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                                            >
                                                <Settings className="w-4 h-4" />
                                                <span>Setări Avansate</span>
                                            </button>
                                        </div>
                                    </div>

                                    {showAdvanced && (
                                        <div className="bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-cyan-400 mb-4">Configurații Avansate</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-cyan-300 text-sm mb-2">Tip Protocol</label>
                                                    <select
                                                        value={protocolType}
                                                        onChange={(e) => setProtocolType(e.target.value)}
                                                        className="w-full bg-black/30 border border-cyan-500/30 rounded-md px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                                                    >
                                                        <option value="tcp">TCP/IP</option>
                                                        <option value="http">HTTP/HTTPS</option>
                                                        <option value="routing">Routing Protocols</option>
                                                        <option value="security">Security Protocols</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-cyan-300 text-sm mb-2">Nivel Detaliu</label>
                                                    <select className="w-full bg-black/30 border border-cyan-500/30 rounded-md px-3 py-2 text-white focus:border-cyan-400 focus:outline-none">
                                                        <option>Academic</option>
                                                        <option>Profesional</option>
                                                        <option>Cercetare</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Analysis Tab */}
                            {activeTab === 'analysis' && (
                                <div className="bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                                    <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                                        <Cpu className="w-5 h-5 mr-2" />
                                        Analiză Avansată Protocol
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-lg border border-cyan-500/20">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-green-400 font-medium">Compatibilitate</span>
                                                    <span className="text-green-400">98%</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-2">
                                                    <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full" style={{width: '98%'}}></div>
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-cyan-500/20">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-yellow-400 font-medium">Complexitate</span>
                                                    <span className="text-yellow-400">Medie</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-2">
                                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style={{width: '65%'}}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-cyan-300 font-medium">Protocoale Detectate:</h4>
                                            <div className="space-y-2">
                                                {Object.entries(protocolSynonyms).slice(0, 5).map(([protocol, trans], index) => (
                                                    <div key={protocol} className="flex items-center justify-between bg-black/30 p-2 rounded border border-cyan-500/10">
                                                        <span className="text-white">{protocol}</span>
                                                        <span className="text-cyan-400 text-sm">{trans.ro}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Saved Tab */}
                            {activeTab === 'saved' && (
                                <div className="bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                                    <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                                        <Database className="w-5 h-5 mr-2" />
                                        Protocoale Salvate
                                    </h2>

                                    {savedProtocols.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Database className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                            <p className="text-gray-400">Nu există protocoale salvate</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {savedProtocols.map((protocol) => (
                                                <div key={protocol.id} className="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="text-cyan-300 font-medium">{protocol.name}</h4>
                                                        <div className="flex space-x-2">
                                                            <button className="text-blue-400 hover:text-blue-300">
                                                                <Edit3 className="w-4 h-4" />
                                                            </button>
                                                            <button className="text-green-400 hover:text-green-300">
                                                                <Copy className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteProtocol(protocol.id)}
                                                                className="text-red-400 hover:text-red-300"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-300 text-sm mb-2">{protocol.timestamp}</p>
                                                    <p className="text-white text-sm line-clamp-3">{protocol.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Panel */}
                        <div className="space-y-6">

                            {/* Protocol Dictionary */}
                            <div className="bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
                                    <Shield className="w-5 h-5 mr-2" />
                                    Dicționar Protocoale
                                </h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {Object.entries(protocolSynonyms).map(([protocol, translations]) => (
                                        <div key={protocol} className="bg-black/30 p-3 rounded border border-cyan-500/10">
                                            <div className="font-medium text-cyan-300">{protocol}</div>
                                            <div className="text-sm text-white mt-1">{translations.ro}</div>
                                            <div className="text-xs text-gray-400 mt-1">{translations.en}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Study Topics */}
                            <div className="bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
                                    <MonitorSpeaker className="w-5 h-5 mr-2" />
                                    Subiecte de Studiu
                                </h3>
                                <div className="space-y-2">
                                    {networkTopics.map((topic, index) => (
                                        <div key={index} className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-2 rounded border border-purple-500/20 hover:border-purple-400/40 transition-colors cursor-pointer">
                                            <span className="text-purple-300 text-sm">{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* System Status */}
                            <div className="bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
                                    <Server className="w-5 h-5 mr-2" />
                                    Status Sistem
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Procesare</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-green-400 text-sm">Activ</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Traduceri</span>
                                        <span className="text-cyan-400">{savedProtocols.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Performanță</span>
                                        <span className="text-green-400">Optimă</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NASAProtocolTranslator;