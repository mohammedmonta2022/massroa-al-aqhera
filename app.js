// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA4tJeZiDUKqEezjlW8UPS9Xv-EnHfwrc",
  authDomain: "unity-msaed.firebaseapp.com",
  projectId: "unity-msaed",
  storageBucket: "unity-msaed.firebasestorage.app",
  messagingSenderId: "237281388685",
  appId: "1:237281388685:web:d9d143eeba27a5193b1ac4",
  measurementId: "G-2QE1ZF3NNT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// قاعدة البيانات المحلية (كـ cache)
const DB = {
    tests: [],
    students: [],
    currentUser: null,
    currentTest: null,
    currentQuestionIndex: 0,
    userAnswers: [],
    adminName: 'منتصر محمد راغب يونس'
};

// أسئلة الخاقانية
const khaganiaQuestions = [
    {
        text: 'من هو العالم الذي يعتبر تاريخياً "أول من صنف في التجويد" بشكل مستقل من خلال منظومته المشهورة؟',
        options: ['الإمام الشاطبي', 'الإمام أبو مزاحم الخاقاني', 'الإمام ابن الجزري', 'الإمام الداني'],
        correct: 1,
        category: 'المعارف التاريخية والمنهجية'
    },
    {
        text: 'ما هو البحر الشعري الذي اختاره الخاقاني لمنظومته، وبماذا تميزت قافيتها؟',
        options: ['بحر الرجز، قافية النون', 'بحر الطويل، قافية الراء المكسورة', 'بحر البسيط، قافية الميم', 'بحر الكامل، قافية اللام'],
        correct: 1,
        category: 'المعارف التاريخية والمنهجية'
    },
    {
        text: 'في أي عام هجري توفي الإمام الخاقاني، وما هي المدينة التي احتضنت نشاطه العلمي؟',
        options: ['248 هـ، مكة المكرمة', '325 هـ، بغداد', '444 هـ، الأندلس', '390 هـ، البصرة'],
        correct: 1,
        category: 'المعارف التاريخية والمنهجية'
    },
    {
        text: 'ما المقصود بمصطلح "أولي الحجر" في مطلع القصيدة: "أقول مقالاً معجباً لأولي الحجر"؟',
        options: ['أصحاب القوة والبطش', 'أصحاب العقول والنهى', 'الحفاظ الصغار في السن', 'سكان المناطق الجبلية'],
        correct: 1,
        category: 'المعارف التاريخية والمنهجية'
    },
    {
        text: 'استهل الخاقاني منظومته بالاستعاذة من آفتين قلبيتين، فما هما؟',
        options: ['الرياء والسمعة', 'المباهاة والفخر', 'الكذب والبهتان', 'الحسد والحقد'],
        correct: 1,
        category: 'المعارف التاريخية والمنهجية'
    },
    {
        text: 'ذكر الخاقاني أن "أخذ القراءة سنة"، فماذا قصد بذلك؟',
        options: ['أنها مستحبة وليست واجبة', 'أنها مأخوذة بالتلقي والمشافهة عن الأولين', 'أنها تابعة لاجتهاد القارئ الشخصي', 'أنها تقرأ في صلاة السنة فقط'],
        correct: 1,
        category: 'المعارف التاريخية والمنهجية'
    },
    {
        text: 'من هو الإمام الذي خصه الخاقاني بلقب "أخو الحذق بالقرآن والنحو والشعر"؟',
        options: ['الإمام نافع', 'الإمام عاصم', 'الإمام الكسائي', 'الإمام حمزة'],
        correct: 2,
        category: 'المعارف التاريخية والمنهجية'
    },
    {
        text: 'كم عدد أبيات المنظومة كما نص عليها صاحبها في متن القصيدة؟',
        options: ['أربعون بيتاً', 'خمسون بيتاً', 'واحد وخمسون بيتاً', 'ستون بيتاً'],
        correct: 2,
        category: 'المعارف التاريخية والمنهجية'
    },
    {
        text: 'ما هي المرتبة التي اعتبرها الخاقاني "أفضل" للقراءة نظراً لما فيها من مكث وفكر؟',
        options: ['الحدر', 'الترتيل', 'التدوير', 'الزمزمة'],
        correct: 1,
        category: 'المعارف التاريخية والمنهجية'
    },
    {
        text: 'رخص الخاقاني في مرتبة "الحدر" بشرط معين، فما هو؟',
        options: ['أن تكون القراءة في الصلاة الجهرية', 'أن تكون في مقام الدرس والمراجعة تيسيراً على العباد', 'أن تكون قراءة أمام العوام', 'ألا تتجاوز سورة الفاتحة'],
        correct: 1,
        category: 'المعارف التاريخية والمنهجية'
    },
    {
        text: 'ما المقصود بلفظ "القدح" في قول الناظم: "ومن يقم القرآن كالقدح فليكن"؟',
        options: ['الإناء الذي يشرب فيه الماء', 'السهم المستوي قبل أن يراش', 'الجبل المرتفع', 'الميزان الدقيق'],
        correct: 1,
        category: 'فقه الأداء والمصطلحات الصوتية'
    },
    {
        text: 'ما هي الفائدة التي يجنيها القارئ من "إدمان الدرس" كما ذكر الخاقاني؟',
        options: ['الشهرة والمكانة الاجتماعية', 'ترقيق اللسان وإذهاب أذى الصدر', 'معرفة التفاسير الغريبة', 'كسب المال والرزق'],
        correct: 1,
        category: 'فقه الأداء والمصطلحات الصوتية'
    },
    {
        text: 'ماذا قصد الخاقاني بـ "التحقيق" في مقام الأخذ عن الشيوخ؟',
        options: ['التأكد من صحة السند', 'إعطاء الحروف حقوقها ببطء وإتقان شديد', 'البحث في معاني الآيات', 'القراءة بسرعة الحدر'],
        correct: 1,
        category: 'فقه الأداء والمصطلحات الصوتية'
    },
    {
        text: '"وإن الذي تخفيه ليس بمدغم"، ما الحكم التجويدي الذي تشير إليه هذه العبارة؟',
        options: ['الإظهار المطلق', 'الإخفاء الحقيقي', 'الإدغام الناقص', 'القلب'],
        correct: 1,
        category: 'فقه الأداء والمصطلحات الصوتية'
    },
    {
        text: 'ما المقصود بـ "الجزم" في قوله: "وقل إن تسكين الحروف لجزمها"؟',
        options: ['القطع في المسائل الفقهية', 'السكون التجويدي', 'التوكيد بالنون', 'الوقف الاختياري'],
        correct: 1,
        category: 'فقه الأداء والمصطلحات الصوتية'
    },
    {
        text: 'ما هو "حرف اللين" في اصطلاح الخاقاني القديم؟',
        options: ['الواو والياء الساكنتان المفتوح ما قبلهما', 'حروف المد الثلاثة', 'حروف الحلق الستة', 'حروف الإدغام بغير غنة'],
        correct: 1,
        category: 'فقه الأداء والمصطلحات الصوتية'
    },
    {
        text: '"ولا تفرطن في الفتح والضم والكسر"، ما الذي يحذر منه الخاقاني هنا؟',
        options: ['ترك الحركات بالكلية', 'المبالغة في الحركة حتى يتولد منها حرف مد زائد', 'القراءة ببطء شديد', 'نسيان علامات الإعراب'],
        correct: 1,
        category: 'فقه الأداء والمصطلحات الصوتية'
    },
    {
        text: 'ما هو "النبر" الذي حذر الخاقاني من الهمز عنده في البيت 35؟',
        options: ['النطق بالحرف المشدد', 'الهمزة أو الضغط الصوتي الذي قد يولد همزة غير أصلية', 'رفع الصوت في نهاية الآية', 'المد العارض للسكون'],
        correct: 1,
        category: 'فقه الأداء والمصطلحات الصوتية'
    },
    {
        text: 'طالب الخاقاني بـ "إنعام بيان" حرفين معينين لتداخلهما أو خفائهما، ما هما؟',
        options: ['النون والميم', 'الراء واللام', 'العين والهاء', 'السين والصاد'],
        correct: 2,
        category: 'فقه الأداء والمصطلحات الصوتية'
    },
    {
        text: 'ما هو التوجيه الذي قدمه الخاقاني بخصوص الوقف في القراءة؟',
        options: ['الوقف عند رأس كل آية مهما كان المعنى', 'الوقف عند إتمام الكلام موافقاً للمصحف المتلو', 'الوقف بعد كل كلمة طويلة', 'عدم الوقف إلا عند انتهاء النفس'],
        correct: 1,
        category: 'فقه الأداء والمصطلحات الصوتية'
    },
    {
        text: 'حذر الخاقاني من تشديد النون في موضع معين، ما هو؟',
        options: ['النون المشددة الأصلية', 'النون المظهرة عند حروف الحلق', 'نون الجمع في نهاية الكلم', 'نون التوكيد الخفيفة'],
        correct: 1,
        category: 'الأحكام الدقيقة واللطائف اللغوية'
    },
    {
        text: 'ماذا قصد الخاقاني بـ "إشباع الضم قبل الواو" في "إياك نعبد وإياك"؟',
        options: ['مدها مداً طويلاً كمد المنفصل', 'إتمام الحركة بحيث لا تختلس ولا تذهب بجمال الأداء', 'تحويلها إلى فتحة عند الوصل', 'تسكين الدال للراحة'],
        correct: 1,
        category: 'الأحكام الدقيقة واللطائف اللغوية'
    },
    {
        text: 'علل الخاقاني مد "ولا الضالين" بعلة صوتية معينة، ما هي؟',
        options: ['لأنها في نهاية سورة الفاتحة', 'لأن الساكنين تلاقيا فصار المد كتحريك للساكن الأول', 'لأنها قراءة عاصم وحده', 'لأن الألف حرف قوي'],
        correct: 1,
        category: 'الأحكام الدقيقة واللطائف اللغوية'
    },
    {
        text: 'ذكر الخاقاني حروف الحلق الستة، فما هو الحكم التجويدي للنون قبلها؟',
        options: ['الإخفاء', 'الإدغام', 'الإظهار (البيان)', 'القلب'],
        correct: 2,
        category: 'الأحكام الدقيقة واللطائف اللغوية'
    },
    {
        text: 'ما معنى كلمة "ينذرب" في قوله: "ورقق بيان الراء واللام ينذرب لسانك"؟',
        options: ['يثقل ويتلعثم', 'يحدّ ويصبح بليغاً فصيحاً', 'يرتجف ويهتز', 'يختفي صوته'],
        correct: 1,
        category: 'الأحكام الدقيقة واللطائف اللغوية'
    },
    {
        text: 'ما هو "القياس" الذي ذكره الخاقاني بخصوص التنوين في البيت 48؟',
        options: ['قياس التنوين على حكم النون الساكنة', 'قياس القرآن على كلام العرب', 'قياس المد الطويل على المد القصير', 'قياس مخارج الحروف على بعضها'],
        correct: 0,
        category: 'الأحكام الدقيقة واللطائف اللغوية'
    },
    {
        text: 'ما الحكم الذي نبه عليه الخاقاني عند التقاء الميم بحرف غيرها؟',
        options: ['وجوب الإدغام الشفوي', 'عدم إدغام الميم وقبول العلم بالشكر (الإظهار الشفوي)', 'وجوب الإخفاء الشفوي دائماً', 'التشديد المفرط للميم'],
        correct: 1,
        category: 'الأحكام الدقيقة واللطائف اللغوية'
    },
    {
        text: 'طلب الخاقاني من طلابه الدعاء له في وقت محدد، فما هو وما رمزيته؟',
        options: ['وقت الظهر؛ رمزاً لانتشار العلم', 'لدى الفجر؛ رمزاً لوقت الإجابة والبركة', 'عند الغروب؛ رمزاً للتواضع', 'يوم الجمعة؛ رمزاً للاجتماع'],
        correct: 1,
        category: 'الأحكام الدقيقة واللطائف اللغوية'
    },
    {
        text: 'كيف وصف الخاقاني تأثير "إدمان الدرس" على صوت القارئ؟',
        options: ['يجعله غليظاً قوياً', 'يرقق اللسان ويجعله عذباً بالتلاوة', 'يجعله سريعاً جداً في الكلام', 'يقلل من جودة صوته'],
        correct: 1,
        category: 'الأحكام الدقيقة واللطائف اللغوية'
    },
    {
        text: '"ففي شربة لو كان علمي سقيتكم"، ما هي اللطيفة التربوية في هذا البيت؟',
        options: ['أن العلم مر المذاق كالدواء', 'حب الناظم لتلاميذه ورغبته في بذل العلم بسهولة ويسر', 'أن العلم يحتاج لشرب الكثير من الماء', 'أن العلم مخزون في الكؤوس'],
        correct: 1,
        category: 'الأحكام الدقيقة واللطائف اللغوية'
    },
    {
        text: 'أي من القراء السبعة ذكر الخاقاني أنه "بالشام"؟',
        options: ['ابن كثير', 'ابن عامر', 'أبو عمرو بن العلاء', 'عاصم الكوفي'],
        correct: 1,
        category: 'تطبيقات تحليلية وربط منهجي'
    },
    {
        text: 'ما هو الركن الذي شدد عليه الخاقاني في قوله: "فما كل من يتلو الكتاب يقيمه"؟',
        options: ['ركن الحفظ الغيبي فقط', 'ركن إقامة حدود الحروف وحقوقها (التجويد العملي)', 'ركن كثرة القراءة ليل نهار', 'ركن القراءة بصوت مرتفع'],
        correct: 1,
        category: 'تطبيقات تحليلية وربط منهجي'
    },
    {
        text: '"زن الحرف لا تخرجه عن حد وزنه"، ما هو "الميزان" المقصود هنا؟',
        options: ['ميزان العروض والقوافي', 'ميزان صفات الحروف ومخارجها المقدرة', 'ميزان عدد الصفحات اليومية', 'ميزان سرعة القراءة'],
        correct: 1,
        category: 'تطبيقات تحليلية وربط منهجي'
    },
    {
        text: 'حذر الخاقاني من "اللحن" وذكر أنه "ما للذي لا يعرف اللحن من عذر"، فما هو اللحن المقصود؟',
        options: ['النغمات الموسيقية', 'الخطأ في التلاوة (الجلي والخفي)', 'سرعة القراءة الزائدة', 'الوقف القبيح فقط'],
        correct: 1,
        category: 'تطبيقات تحليلية وربط منهجي'
    },
    {
        text: 'ما هي "حروف الحلق الستة" بالترتيب الذي يمكن استنتاجه من منظومة الخاقاني؟',
        options: ['الحاء، الخاء، الهاء، الهمزة، العين، الغين', 'الهمزة، الهاء، العين، الحاء، الغين، الخاء', 'النون، الميم، اللام، الراء، الدال، التاء', 'الألف، الواو، الياء، العين، الحاء، الغين'],
        correct: 0,
        category: 'تطبيقات تحليلية وربط منهجي'
    },
    {
        text: 'ماذا يقصد الخاقاني بـ "إتمام الكلام" عند الوقف؟',
        options: ['الانتهاء من السورة كاملة', 'الوقوف على معنى مفيد تام لا يتعلق بما بعده لفظاً', 'الوقوف عند انتهاء السطر في المصحف', 'الوقوف على كلمة "آمين"'],
        correct: 1,
        category: 'تطبيقات تحليلية وربط منهجي'
    },
    {
        text: '"فوزن حروف الذكر من أفضل البر"، ما هي الدلالة الشرعية لهذا البيت؟',
        options: ['أن التجويد نافلة لا يثاب عليها', 'أن إتقان قراءة القرآن وتجويده من أعظم القربات إلى الله', 'أن القراءة لا تحتاج إلى نية', 'أن البر يقتصر على الصدقة فقط'],
        correct: 1,
        category: 'تطبيقات تحليلية وربط منهجي'
    },
    {
        text: 'أي من المصطلحات التالية استخدمه الخاقاني للتعبير عن الحركة الإعرابية "الكسرة"؟',
        options: ['النصب', 'الجر', 'الرفع', 'الخفض'],
        correct: 1,
        category: 'تطبيقات تحليلية وربط منهجي'
    },
    {
        text: 'ماذا قصد الخاقاني بـ "تسكين الحروف لجزمها"؟',
        options: ['الجزم في القول', 'أن علامة الجزم الأصلية في اللغة هي السكون', 'وجوب الوقف على كل كلمة مجزومة', 'ترك الغنة في النون المجزومة'],
        correct: 1,
        category: 'تطبيقات تحليلية وربط منهجي'
    },
    {
        text: '"فلابن عبيد الله موسى على الذي يعلمه الخير الدعاء لدى الفجر"، من هو ابن عبيد الله؟',
        options: ['أحد القراء السبعة', 'الناظم نفسه (أبو مزاحم الخاقاني)', 'تلميذ الناظم المفضل', 'الخليفة العباسي في ذلك الوقت'],
        correct: 1,
        category: 'تطبيقات تحليلية وربط منهجي'
    }
];

// أسئلة الأصول الستة
const usoolQuestions = [
    {
        text: 'ما هو تعريف الإخلاص شرعاً كما يُفهم من سياق الأصول الستة وشروحها؟',
        options: [
            'أن يقصد المرء بعبادته التقرب إلى الله والتوصل إلى دار كرامته بصدق نية',
            'أن يقوم العبد بالعبادة والناس ينظرون إليه ليقتدوا به',
            'أن يلتزم العبد بالعبادات الظاهرة دون اعتبار للقصد القلبي',
            'أن يترك العبد العمل خوفاً من الوقوع في الرياء'
        ],
        correct: 0,
        category: 'الأصل الأول: إخلاص الدين لله'
    },
    {
        text: 'ما هي الحيلة الشيطانية التي ذكرها المؤلف لقلب حقيقة "الإخلاص" في قلوب الناس؟',
        options: [
            'تصوير الإخلاص على أنه كبر وغرور',
            'إظهار الإخلاص في صورة "تنقص الصالحين والتقصير في حقوقهم"',
            'ادعاء أن الإخلاص لا يمكن تحقيقه إلا بترك الدنيا تماماً',
            'إخفاء مفهوم الإخلاص كلياً من الكتب'
        ],
        correct: 1,
        category: 'الأصل الأول: إخلاص الدين لله'
    },
    {
        text: 'الشرك في اللغة يأتي بمعنى "الخلط والضم"، فما هو الشرك المخرج من الملة في الاصطلاح الشرعيpp؟',
        options: [
            'أن يرتكب المسلم كبيرة من كبائر الذنوب كالسرقة',
            'أن يصرف العبد شيئاً من أنواع العبادة لغير الله كالصلاة أو الذبح لغيره',
            'أن يشك المرء في بعض الأمور الفقهية الفرعية',
            'أن يقصر العبد في أداء صلاة الجماعة في المسجد'
        ],
        correct: 1,
        category: 'الأصل الأول: إخلاص الدين لله'
    },
    {
        text: 'كيف وصف المؤلف وضوح آيات القرآن في بيان أصل التوحيد والإخلاصpp؟',
        options: [
            'بأنها آيات مجملة تحتاج لعلماء الكلام لتفسيرها',
            'بأنها واضحة لدرجة يفهمها "أبلد العامة" وبوجوه شتى',
            'بأنها رموز لا يفهمها إلا من كوشف بالحقائق الغيبية',
            'بأنها خاصة بجيل الصحابة فقط ولا تنطبق على المتأخرين'
        ],
        correct: 1,
        category: 'الأصل الأول: إخلاص الدين لله'
    },
    {
        text: 'ما هو الربط الذي وضعه الشراح بين الإخلاص وبين النجاة من النار ودخول الجنةpp؟',
        options: [
            'أن الإخلاص مجرد فضيلة ترفع الدرجات ولا تؤثر في أصل النجاة',
            'أن من مات لا يشرك بالله شيئاً دخل الجنة، ومن مات يشرك به شيئاً دخل النار',
            'أن النجاة تعتمد على كثرة الأعمال الصالحة فقط وإن شابها شرك أصغر',
            'أن دخول الجنة لا يشترط له البراءة من الشرك'
        ],
        correct: 1,
        category: 'الأصل الأول: إخلاص الدين لله'
    },
    {
        text: 'ما هو "حبل الله" الذي أمر الله بالاعتصام به في قوله (واعتصموا بحبل الله جميعاً)pp؟',
        options: [
            'النسب والقرابة بين المسلمين',
            'التحالفات العسكرية ضد الأعداء',
            'القرآن والعهد والإسلام والجماعة',
            'الحدود الجغرافية للدول الإسلامية'
        ],
        correct: 2,
        category: 'الأصل الثاني: الاجتماع في الدين'
    },
    {
        text: 'كيف وصف المؤلف الحالة الذهنية والاجتماعية لمن يأمر بالاجتماع في الدين في العصور المتأخرةpp؟',
        options: [
            'يوصف بأنه المصلح المجدد الذي يجب اتباعه',
            'يوصف بأنه "زنديق أو مجنون"',
            'يحظى بتقدير الملوك والعامة',
            'يعتبر فقيهاً متبحراً في علوم الشريعة'
        ],
        correct: 1,
        category: 'الأصل الثاني: الاجتماع في الدين'
    },
    {
        text: 'ما هو الضد الذي حذر الله منه في الأصل الثاني وربطه بهلاك الأمم السابقةpp؟',
        options: [
            'الفقر والجوع',
            'التفرق والاختلاف في الدين',
            'ترك التجارة والصناعة',
            'قلة العلم باللغات الأجنبية'
        ],
        correct: 1,
        category: 'الأصل الثاني: الاجتماع في الدين'
    },
    {
        text: 'ينقسم الاجتماع إلى "اجتماع أديان" و"اجتماع أبدان"، فما المقصود باجتماع الأديان في هذا السياقpp؟',
        options: [
            'أن يتواجد الناس في مكان واحد للصلاة',
            'أن يجتمع الناس على الحق والهدى والتوحيد والسنة وما كان عليه الصحابة',
            'أن تتوحد جميع الأديان في دين واحد عالمي',
            'أن يسود السلام بين جميع الطوائف دون النظر للعقيدة'
        ],
        correct: 1,
        category: 'الأصل الثاني: الاجتماع في الدين'
    },
    {
        text: 'ما هي القاعدة الجاهلية التي خالفها النبي صلى الله عليه وسلم وتتعلق بالحكم على الأشياءpp؟',
        options: [
            'قاعدة الاغترار بالأكثرية واتخاذها دليلاً على الصحة',
            'قاعدة الاهتمام بالشعر والأدب',
            'قاعدة الكرم والشجاعة',
            'قاعدة التجارة في مواسم الحج'
        ],
        correct: 0,
        category: 'الأصل الثاني: الاجتماع في الدين'
    },
    {
        text: 'ما هو القيد الذي ذكره النبي صلى الله عليه وسلم في وجوب السمع والطاعة لولي الأمرpp؟',
        options: [
            'أن يكون الحاكم من أشراف الناس فقط',
            'السمع والطاعة في المعروف (أي في غير معصية الله)',
            'أن يكون الحاكم عادلاً في كل قراراته كشرط للطاعة',
            'لا يوجد أي قيد، فالطاعة مطلقة في كل شيء'
        ],
        correct: 1,
        category: 'الأصل الثالث: السمع والطاعة'
    },
    {
        text: 'لماذا استخدم المؤلف عبارة "ولو كان عبداً حبشياً" في سياق الحديث عن الإمامةpp؟',
        options: [
            'لبيان أن الإسلام لا يفرق بين الأعراق في المناصب الإدارية فقط',
            'للتأكيد على وجوب الطاعة لمن استتب له الأمر أياً كان أصله ونسبه',
            'لأن العبيد الحبشيين كانوا هم الحكام في ذلك العصر',
            'كنوع من المجاز الذي لا ينطبق على الواقع'
        ],
        correct: 1,
        category: 'الأصل الثالث: السمع والطاعة'
    },
    {
        text: 'ما هو الوصف الذي أطلقه السلف (مثل أبي إدريس الخولاني) على سب الإمامpp؟',
        options: [
            'هو نوع من حرية التعبير المباحة',
            'هو "الحالقة" التي تحلق الدين',
            'هو معصية صغيرة لا تؤثر في إيمان الشخص',
            'هو واجب وطني لتقويم الحاكم'
        ],
        correct: 1,
        category: 'الأصل الثالث: السمع والطاعة'
    },
    {
        text: 'كيف بين النبي صلى الله عليه وسلم أصل السمع والطاعة كما ورد في متن الرسالةpp؟',
        options: [
            'بينه في أحاديث قليلة قد لا يحيط بها إلا المتخصصون',
            'بينه بياناً شائعاً ذائعاً بكل وجه من أنواع البيان شرعاً وقدراً',
            'ترك الأمر لاجتهاد المسلمين حسب مصالحهم الدنيوية',
            'بينه كأصل فرعي لا يدخل في مسائل العقيدة'
        ],
        correct: 1,
        category: 'الأصل الثالث: السمع والطاعة'
    },
    {
        text: 'ما هي نتيجة طعن المرء في إمامه بحسب أثر أبي الدرداء رضي الله عنهpp؟',
        options: [
            'زيادة الوجاهة بين الناس',
            'أن ذلك هو "أول نفاق المرء"',
            'تطور الأنظمة السياسية',
            'لا يترتب عليه أي أثر ديني'
        ],
        correct: 1,
        category: 'الأصل الثالث: السمع والطاعة'
    },
    {
        text: 'أي سورة من القرآن أشار إليها المؤلف بأنها بينت أصل "العلم والعلماء" في بدايتهاpp؟',
        options: ['سورة الفاتحة', 'سورة البقرة', 'سورة آل عمران', 'سورة المائدة'],
        correct: 1,
        category: 'الأصل الرابع: العلم والعلماء'
    },
    {
        text: 'ما هو التوصيف الذي ذكره المؤلف لما صار يسمى "علماً وفقهاً" عند أكثر الناس في عصرهpp؟',
        options: [
            'الحفظ المتقن لمتون اللغة العربية',
            'البدع والضلالات ولبس الحق بالباطل',
            'دراسة الفلك والرياضيات',
            'التبحر في أصول التفسير'
        ],
        correct: 1,
        category: 'الأصل الرابع: العلم والعلماء'
    },
    {
        text: 'بماذا يعرف العالم الحق من غيره بحسب شروح الرسالةpp؟',
        options: [
            'بكثرة ظهوره في المحافل وتجمهر الناس حوله',
            'بعمله بعلمه واستدلاله بالكتاب والسنة على فهم السلف',
            'بقدرته على الجدال والمناظرة بالمنطق اليوناني',
            'بانتمائه إلى حزب أو جماعة معينة'
        ],
        correct: 1,
        category: 'الأصل الرابع: العلم والعلماء'
    },
    {
        text: 'ما هو النهي القرآني الوارد في سورة البقرة (الآية 42) والذي يتعلق بمنهج العلماء الضالينpp؟',
        options: [
            '"ولا تكونوا أول كافر به"',
            '"ولا تلبسوا الحق بالباطل وتكتموا الحق وأنتم تعلمون"',
            '"وأقيموا الصلاة وآتوا الزكاة"',
            '"واستعينوا بالصبر والصلاة"'
        ],
        correct: 1,
        category: 'الأصل الرابع: العلم والعلماء'
    },
    {
        text: 'كيف وصف المؤلف الشخص الذي ينكر البدع والضلالات ويتمسك بالعلم الذي مدحه اللهpp؟',
        options: [
            'صار يسمى فقيهاً عالماً',
            'صار لا يتفوه به إلا "زنديق أو مجنون"',
            'صار يحظى بمكانة اجتماعية عالية',
            'صار هو المرجع المعتمد للدولة'
        ],
        correct: 1,
        category: 'الأصل الرابع: العلم والعلماء'
    },
    {
        text: 'ما هو الضابط القرآني للولاية كما ورد في سورة يونسpp؟',
        options: [
            'امتلاك القدرة على المشي على الماء والطيران',
            '"الذين آمنوا وكانوا يتقون"',
            'الاعتزال في الصوامع والكهوف',
            'الغنى والجاه والنسب الشريف'
        ],
        correct: 1,
        category: 'الأصل الخامس: أولياء الله'
    },
    {
        text: 'تسمى آية آل عمران "آية الاختبار"، فما هي هذه الآيةpp؟',
        options: [
            '"قل إن كنتم تحبون الله فاتبعوني يحببكم الله"',
            '"يا أيها الذين آمنوا اتقوا الله حق تقاته"',
            '"إن الدين عند الله الإسلام"',
            '"ولله على الناس حج البيت"'
        ],
        correct: 0,
        category: 'الأصل الخامس: أولياء الله'
    },
    {
        text: 'ما هي صفات القوم الذين يأتي بهم الله كما ورد في آية سورة المائدة (الآية 54)pp؟',
        options: [
            'يحبهم ويحبونه، أذلة على المؤمنين أعزة على الكافرين، يجاهدون في سبيل الله',
            'يتركون العمل الدنيوي ويتفرغون للذكر فقط',
            'يتبعون الآراء والعقول ويقدمونها على الوحي',
            'يخافون لومة اللائم في كل مجلس'
        ],
        correct: 0,
        category: 'الأصل الخامس: أولياء الله'
    },
    {
        text: 'ما هي الشبهة التي وضعها الشيطان حول صفة الولي عند المتأخرينpp؟',
        options: [
            'أن الولي لابد أن يكون عالماً باللغة العربية',
            'أن الولي لابد أن يترك اتباع الرسل، فمن اتبعهم فليس منهم',
            'أن الولي هو من يحفظ القرآن فقط',
            'أن الولي لا يمكن أن يكون من العوام'
        ],
        correct: 1,
        category: 'الأصل الخامس: أولياء الله'
    },
    {
        text: 'من هم "المتألهون" الذين حذر منهم المؤلف في سياق حديثه عن الأولياءpp؟',
        options: [
            'الذين يعبدون الله على جهل',
            'المنافقون والفجار المتشبهون بأولياء الله من أعدائه',
            'الفلاسفة الذين ينكرون وجود الله',
            'علماء الطبيعة والكون'
        ],
        correct: 1,
        category: 'الأصل الخامس: أولياء الله'
    },
    {
        text: 'ما هي الدعوى التي يروجها الشيطان ليصرف الناس عن طلب الهدى من الكتاب والسنةpp؟',
        options: [
            'أن القرآن والسنة قد نُسخا كلياً',
            'أنهما لا يعرفهما إلا المجتهد المطلق ذو الأوصاف المستحيلة',
            'أن اللغة العربية لم تعد صالحة لفهم النصوص',
            'أن الوحي خاص بجزيرة العرب فقط'
        ],
        correct: 1,
        category: 'الأصل السادس: رد الشبهات'
    },
    {
        text: 'بماذا وصف المؤلف أوصاف المجتهد التي وضعها المتكلمونpp؟',
        options: [
            'أوصافاً دقيقة تضمن جودة الاستنباط',
            'أوصافاً لعلها لا توجد تامة في أبي بكر وعمر',
            'أوصافاً سهلة يمكن لأي طالب علم تحقيقها',
            'أوصافاً لم يذكرها أحد من قبل'
        ],
        correct: 1,
        category: 'الأصل السادس: رد الشبهات'
    },
    {
        text: 'ما هو الحكم الذي يصدره أصحاب هذه الشبهة على من يطلب الهدى مباشرة من الكتاب والسنةpp؟',
        options: [
            'يعتبرونه باحثاً مجتهداً مأجوراً',
            'يعتبرونه إما زنديقاً أو مجنوناً لأجل صعوبة فهمهما',
            'يشجعونه على مواصلة البحث',
            'يعتبرونه متبعاً لمنهج السلف'
        ],
        correct: 1,
        category: 'الأصل السادس: رد الشبهات'
    },
    {
        text: 'كيف بين الله سبحانه الرد على هذه الشبهة "الملعونة" بحسب نص الرسالةpp؟',
        options: [
            'ببيان وجوه شتى شرعاً وقدراً وخلقاً وأمراً بلغت حد الضروريات',
            'بإنزال آيات جديدة ترد على هؤلاء',
            'بتكليف الملائكة بشرح القرآن للناس',
            'لم يبين الرد عليها وتركها لعقول الناس'
        ],
        correct: 0,
        category: 'الأصل السادس: رد الشبهات'
    },
    {
        text: 'ما هو البديل الذي وضعه الشيطان للناس بعد أن صرفهم عن القرآن والسنةpp؟',
        options: [
            'اتباع العلوم التجريبية والمادية',
            'اتباع الآراء والأهواء المتفرقة المختلفة',
            'الصمت وعدم التحدث في أمور الدين',
            'الرجوع إلى كتب الفلاسفة اليونان فقط'
        ],
        correct: 1,
        category: 'الأصل السادس: رد الشبهات'
    }
];

// تهيئة التطبيق
function init() {
    loadData();
    setupEventListeners();
    showPage('loginPage');
}

// تحميل البيانات من localStorage
// تحميل البيانات من Firebase
async function loadData() {
    try {
        // تحميل الأقسام/الاختبارات
        const testsSnapshot = await db.collection('tests').orderBy('createdAt', 'desc').get();
        DB.tests = [];
        testsSnapshot.forEach(doc => {
            DB.tests.push({ id: doc.id, ...doc.data() });
        });
        
        // إذا لم تكن هناك اختبارات، نضيف الاختبارات الافتراضية
        if (DB.tests.length === 0) {
            await createDefaultTests();
        }
        
        // تحميل الطلاب
        const studentsSnapshot = await db.collection('students').get();
        DB.students = [];
        studentsSnapshot.forEach(doc => {
            DB.students.push({ id: doc.id, ...doc.data() });
        });
    } catch (error) {
        console.error('Error loading data:', error);
        alert('حدث خطأ في تحميل البيانات. تأكد من اتصالك بالإنترنت.');
    }
}

// إنشاء الاختبارات الافتراضية
async function createDefaultTests() {
    const defaultTests = [
        {
            name: 'اختبار الخاقانية',
            description: 'بنك الأسئلة التخصصي الشامل في المنظومة الخاقانية (40 سؤالاً)',
            icon: 'fa-book-quran',
            questions: khaganiaQuestions,
            createdAt: Date.now()
        },
        {
            name: 'اختبار الأصول الستة',
            description: 'الأصول الستة في العقيدة والدعوة',
            icon: 'fa-star-and-crescent',
            questions: usoolQuestions,
            createdAt: Date.now()
        }
    ];
    
    for (const test of defaultTests) {
        await db.collection('tests').add(test);
    }
    
    // إعادة التحميل
    await loadData();
}

// حفظ البيانات في Firebase
async function saveData() {
    // ملاحظة: البيانات تُحفظ مباشرة عند كل عملية تعديل
    // هذه الدالة للتوافق مع الكود القديم
}

// حفظ اختبار في Firebase
async function saveTest(testData) {
    try {
        if (testData.id) {
            await db.collection('tests').doc(testData.id).update(testData);
        } else {
            await db.collection('tests').add(testData);
        }
        await loadData();
    } catch (error) {
        console.error('Error saving test:', error);
    }
}

// حذف اختبار من Firebase
async function deleteTestFromFirebase(testId) {
    try {
        await db.collection('tests').doc(testId).delete();
        // حذف أسئلة الطلاب المرتبطة
        const studentsSnapshot = await db.collection('students')
            .where('testId', '==', testId)
            .get();
        const batch = db.batch();
        studentsSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        await loadData();
    } catch (error) {
        console.error('Error deleting test:', error);
    }
}

// حفظ طالب في Firebase
async function saveStudent(studentData) {
    try {
        if (studentData.id) {
            await db.collection('students').doc(studentData.id).update(studentData);
        } else {
            await db.collection('students').add(studentData);
        }
        await loadData();
    } catch (error) {
        console.error('Error saving student:', error);
    }
}

// تحديث بيانات طالب
async function updateStudent(studentId, studentData) {
    try {
        await db.collection('students').doc(studentId).update(studentData);
        await loadData();
    } catch (error) {
        console.error('Error updating student:', error);
    }
}

// حذف طالب من Firebase
async function deleteStudentFromFirebase(studentId) {
    try {
        await db.collection('students').doc(studentId).delete();
        await loadData();
    } catch (error) {
        console.error('Error deleting student:', error);
    }
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById(e.target.dataset.tab + 'Tab').classList.add('active');
        });
    });
    
    // Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        });
    });
    
    // JSON File Upload
    document.getElementById('jsonFile').addEventListener('change', handleJsonUpload);
    
    // Question Form
    document.getElementById('questionForm').addEventListener('submit', handleAddQuestion);
    
    // Test Filter
    document.getElementById('testFilter').addEventListener('change', renderStudentsTable);
}

// معالجة تسجيل الدخول
async function handleLogin(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    
    if (fullName.length < 10) {
        alert('الرجاء إدخال الاسم الرباعي كاملاً (10 أحرف على الأقل)');
        return;
    }
    
    DB.currentUser = {
        name: fullName,
        loginTime: Date.now()
    };
    
    // التحقق مما إذا كان المشرف
    if (fullName === DB.adminName) {
        showPage('adminPage');
        renderAdminDashboard();
    } else {
        document.getElementById('userName').textContent = fullName;
        showPage('mainPage');
        renderTestsGrid();
    }
}

// معالجة تسجيل الخروج
function handleLogout() {
    DB.currentUser = null;
    DB.currentTest = null;
    document.getElementById('fullName').value = '';
    showPage('loginPage');
}

// عرض الصفحة المحددة
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// عرض شبكة الاختبارات
function renderTestsGrid() {
    const grid = document.getElementById('testsGrid');
    grid.innerHTML = '';
    
    const now = Date.now();
    const fiveDays = 5 * 24 * 60 * 60 * 1000;
    
    DB.tests.forEach(test => {
        const card = document.createElement('div');
        card.className = 'test-card';
        
        // إضافة badge "جديد" إذا كان القسم جديدًا
        const isNew = now - test.createdAt < fiveDays;
        
        // التحقق من حالة الطالب مع هذا الاختبار
        const studentProgress = DB.students.find(
            s => s.name === DB.currentUser.name && s.testId === test.id
        );
        
        let statusHTML = '';
        if (studentProgress && studentProgress.completed) {
            // اختبار مكتمل
            statusHTML = `
                <div class="test-status completed">
                    <div>
                        <i class="fas fa-check-circle"></i> مكتمل
                        <div class="score-details">
                            <span style="color: var(--primary-color);"><i class="fas fa-check"></i> ${studentProgress.score} صحيح</span>
                            <span style="color: var(--danger-color);"><i class="fas fa-times"></i> ${test.questions.length - studentProgress.score} خطأ</span>
                        </div>
                    </div>
                    <button class="btn-retake" onclick="event.stopPropagation(); retakeTestFromGrid(${test.id})">
                        <i class="fas fa-redo"></i> إعادة
                    </button>
                </div>
            `;
        } else if (studentProgress && !studentProgress.completed && studentProgress.currentQuestion > 0) {
            // اختبار غير مكتمل但有 تقدم
            const percentage = Math.round((studentProgress.currentQuestion / test.questions.length) * 100);
            statusHTML = `
                <div class="test-status incomplete">
                    <div>
                        <i class="fas fa-clock"></i> قيد التقدم (${percentage}%)
                        <div class="score-details">
                            <span><i class="fas fa-question"></i> ${studentProgress.currentQuestion} من ${test.questions.length}</span>
                        </div>
                    </div>
                    <div class="test-status-buttons">
                        <button class="btn-continue" onclick="event.stopPropagation(); continueTest(${test.id})">
                            <i class="fas fa-play"></i> أكمل
                        </button>
                        <button class="btn-retake" onclick="event.stopPropagation(); retakeTestFromGrid(${test.id})">
                            <i class="fas fa-redo"></i> إعادة
                        </button>
                    </div>
                </div>
            `;
        } else {
            // اختبار لم يبدأ
            statusHTML = `
                <div class="test-status" style="background: rgba(6, 78, 59, 0.05); border: 2px dashed var(--border-color); color: var(--text-secondary);">
                    <i class="fas fa-circle-notch"></i> لم يبدأ بعد
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="test-icon">
                <i class="fas ${test.icon || 'fa-book'}"></i>
            </div>
            <h3>${isNew ? '<span class="new-badge-label">جديد</span>' : ''}${test.name}</h3>
            <p>${test.description}</p>
            <div class="test-meta">
                <span><i class="fas fa-question-circle"></i> ${test.questions.length} سؤال</span>
            </div>
            ${statusHTML}
        `;
        
        card.addEventListener('click', () => startTest(test.id));
        grid.appendChild(card);
    });
}

// بدء الاختبار
async function startTest(testId, resume = false) {
    const test = DB.tests.find(t => t.id === testId || t.name === testId);
    if (!test) return;
    
    // التحقق من تقدم الطالب السابق
    const studentProgress = DB.students.find(
        s => s.name === DB.currentUser.name && s.testId === (test.id || testId)
    );
    
    // إذا كان هناك تقدم ولم يطلب المستخدم الإعادة صراحة، اعرض الخيارات
    if (studentProgress && studentProgress.currentQuestion > 0 && !studentProgress.completed && !resume) {
        showResumeOptions(testId);
        return;
    }
    
    DB.currentTest = test;
    
    // إذا كان اختبار جديد أو إعادة، احذف البيانات القديمة
    if (resume || !studentProgress) {
        DB.currentQuestionIndex = 0;
        DB.userAnswers = [];
    } else {
        // استكمال من حيث توقف
        DB.currentQuestionIndex = studentProgress.currentQuestion;
        DB.userAnswers = studentProgress.answers || [];
    }
    
    document.getElementById('testTitle').textContent = test.name;
    showPage('testPage');
    renderQuestion();
    startTimer();
}

// عرض خيارات الاستكمال أو الإعادة
function showResumeOptions(testId) {
    const test = DB.tests.find(t => t.id === testId);
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>لديك اختبار غير مكتمل في "${test.name}"</h3>
            <p>هل تريد إكمال الاختبار من حيث توقفت أم البدء من جديد؟</p>
            <div class="modal-buttons">
                <button onclick="startTest(${testId}, true)" class="btn btn-primary">أكمل الاختبار</button>
                <button onclick="retakeTestFromGrid(${testId})" class="btn btn-secondary">إعادة الاختبار</button>
                <button onclick="this.closest('.custom-modal').remove()" class="btn btn-cancel">إلغاء</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

// أكمل الاختبار من الشبكة
function continueTest(testId) {
    startTest(testId);
}

// إعادة الاختبار من الشبكة
async function retakeTestFromGrid(testId) {
    const test = DB.tests.find(t => t.id === testId);
    if (!test) return;
    
    // حذف التقدم السابق من Firebase
    const studentToDelete = DB.students.find(
        s => s.name === DB.currentUser.name && s.testId === testId
    );
    
    if (studentToDelete && studentToDelete.id) {
        await deleteStudentFromFirebase(studentToDelete.id);
    } else {
        // حذف محلي فقط
        DB.students = DB.students.filter(
            s => !(s.name === DB.currentUser.name && s.testId === testId)
        );
    }
    
    startTest(testId);
}

// عرض السؤال الحالي
function renderQuestion() {
    const test = DB.currentTest;
    const question = test.questions[DB.currentQuestionIndex];
    
    if (!question) {
        finishTest();
        return;
    }
    
    document.querySelector('.question-number').textContent = `السؤال ${DB.currentQuestionIndex + 1} من ${test.questions.length}`;
    document.querySelector('.category-badge').textContent = question.category || '';
    document.querySelector('.question-text').textContent = question.text;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.disabled = false; // إعادة تفعيل الأزرار عند سؤال جديد
        btn.addEventListener('click', () => selectOption(index));
        // إضافة أنميشن دخول للخيارات
        btn.style.animation = `fadeInUp 0.4s ease-out ${index * 0.1}s backwards`;
        optionsContainer.appendChild(btn);
    });
    
    // تحديث شريط التقدم
    const progress = ((DB.currentQuestionIndex + 1) / test.questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('questionCounter').textContent = `${DB.currentQuestionIndex + 1}/${test.questions.length}`;
    
    // إظهار شريط تتبع النتائج
    document.getElementById('scoreTracker').style.display = 'flex';
    updateScoreTracker();
    
    document.getElementById('nextBtn').disabled = true;
}

// تحديث شريط تتبع النتائج
function updateScoreTracker() {
    let correct = 0;
    let wrong = 0;
    
    DB.userAnswers.forEach((answer, index) => {
        if (answer !== undefined && DB.currentTest.questions[index]) {
            if (answer === DB.currentTest.questions[index].correct) {
                correct++;
            } else {
                wrong++;
            }
        }
    });
    
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('wrongCount').textContent = wrong;
}

// اختيار إجابة
// اختيار إجابة
async function selectOption(index) {
    const buttons = document.querySelectorAll('.option-btn');
    const currentQuestion = DB.currentTest.questions[DB.currentQuestionIndex];
    
    // تعطيل جميع الأزرار لمنع تغيير الإجابة
    buttons.forEach(btn => btn.disabled = true);
    
    buttons.forEach((btn, i) => {
        btn.classList.remove('selected', 'correct', 'wrong');
        
        if (i === index) {
            btn.classList.add('selected');
            
            // التحقق من الإجابة فوراً
            if (i === currentQuestion.correct) {
                btn.classList.add('correct');
                // تشغيل الاحتفال - وريقات ذهبية وخضراء
                showMiniCelebration(btn);
            } else {
                btn.classList.add('wrong');
                // إضافة تأثير الاهتزاز
                btn.classList.add('shake');
                // إظهار الإجابة الصحيحة
                buttons[currentQuestion.correct].classList.add('correct');
            }
        }
    });
    
    DB.userAnswers[DB.currentQuestionIndex] = index;
    
    // تحديث شريط النتائج
    updateScoreTracker();
    
    // حفظ التقدم في Firebase
    await saveProgress();
    
    // الانتقال للسؤال التالي بعد ثانيتين
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

// حفظ تقدم الطالب في Firebase
async function saveProgress() {
    const test = DB.currentTest;
    let studentProgress = DB.students.find(
        s => s.name === DB.currentUser.name && s.testId === test.id
    );
    
    const lastActivity = Date.now();
    
    const studentData = {
        name: DB.currentUser.name,
        testId: test.id,
        testName: test.name,
        currentQuestion: DB.currentQuestionIndex,
        answers: DB.userAnswers,
        completed: false,
        score: 0,
        lastActivity: lastActivity,
        startTime: Date.now()
    };
    
    if (studentProgress) {
        studentProgress.currentQuestion = DB.currentQuestionIndex;
        studentProgress.answers = DB.userAnswers;
        studentProgress.lastActivity = lastActivity;
        
        // تحديث في Firebase
        if (studentProgress.id) {
            await updateStudent(studentProgress.id, studentProgress);
        }
    } else {
        studentData.startTime = Date.now();
        DB.students.push(studentData);
        
        // حفظ في Firebase
        await saveStudent(studentData);
    }
}

// السؤال التالي
function nextQuestion() {
    DB.currentQuestionIndex++;
    renderQuestion();
}

// إنهاء الاختبار
// إنهاء الاختبار
async function finishTest() {
    const test = DB.currentTest;
    let score = 0;
    
    test.questions.forEach((question, index) => {
        if (DB.userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    // احتفال إذا كانت النتيجة جيدة
    if (score > test.questions.length / 2) {
        showCelebration();
    }
    
    // تحديث سجل الطالب
    let studentProgress = DB.students.find(
        s => s.name === DB.currentUser.name && s.testId === test.id
    );
    
    const finalStudentData = {
        name: DB.currentUser.name,
        testId: test.id,
        testName: test.name,
        completed: true,
        score: score,
        totalQuestions: test.questions.length,
        completedAt: Date.now(),
        currentQuestion: test.questions.length,
        answers: DB.userAnswers,
        lastActivity: Date.now()
    };
    
    if (studentProgress) {
        studentProgress.completed = true;
        studentProgress.score = score;
        studentProgress.totalQuestions = test.questions.length;
        studentProgress.completedAt = Date.now();
        studentProgress.currentQuestion = test.questions.length;
        
        // تحديث في Firebase
        if (studentProgress.id) {
            await updateStudent(studentProgress.id, finalStudentData);
        } else {
            // حفظ كطالب جديد
            await saveStudent(finalStudentData);
        }
    } else {
        DB.students.push(finalStudentData);
        // حفظ في Firebase
        await saveStudent(finalStudentData);
    }
    
    // إخفاء شريط تتبع النتائج
    document.getElementById('scoreTracker').style.display = 'none';
    
    // عرض النتيجة
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('scoreTotal').textContent = `من ${test.questions.length}`;
    const percentage = Math.round((score / test.questions.length) * 100);
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    
    showPage('resultPage');
    stopTimer();
}

// إعادة الاختبار
async function retakeTest() {
    const test = DB.currentTest;
    
    // حذف التقدم السابق من Firebase
    const studentToDelete = DB.students.find(
        s => s.name === DB.currentUser.name && s.testId === test.id
    );
    
    if (studentToDelete && studentToDelete.id) {
        await deleteStudentFromFirebase(studentToDelete.id);
    } else {
        // حذف محلي فقط
        DB.students = DB.students.filter(
            s => !(s.name === DB.currentUser.name && s.testId === test.id)
        );
    }
    
    startTest(test.id);
}

// عرض الاحتفال
function showCelebration() {
    const celebration = document.getElementById('celebration');
    celebration.classList.add('active');
    
    // إنشاء confetti بألوان ذهبية وخضراء
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = ['#ffd700', '#10b981', '#d4af37', '#f59e0b'][Math.floor(Math.random() * 4)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        celebration.appendChild(confetti);
    }
    
    setTimeout(() => {
        celebration.classList.remove('active');
        celebration.innerHTML = '<div class="confetti"></div>';
    }, 4000);
}

// احتفال مصغر عند الإجابة الصحيحة
function showMiniCelebration(element) {
    const celebration = document.getElementById('celebration');
    
    // إنشاء وريقات احتفال صغيرة تنبثق من الزر
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti mini-confetti';
        
        // الحصول على موقع الزر
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        confetti.style.left = centerX + 'px';
        confetti.style.top = centerY + 'px';
        confetti.style.backgroundColor = ['#ffd700', '#10b981', '#d4af37', '#f59e0b'][Math.floor(Math.random() * 4)];
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        confetti.style.animationDuration = (Math.random() * 1 + 1) + 's';
        
        // تعيين متغيرات CSS للحركة - زوايا موزعة بشكل دائري
        const angle = (i / 30) * 2 * Math.PI; // بالراديان
        const distance = 50 + Math.random() * 100;
        confetti.style.setProperty('--angle', angle + 'rad');
        confetti.style.setProperty('--distance', distance + 'px');
        
        celebration.appendChild(confetti);
    }
    
    setTimeout(() => {
        celebration.innerHTML = '<div class="confetti"></div>';
    }, 2000);
}

// إنشاء نجوم الخلفية
function createStars() {
    const pattern = document.getElementById('arabicPattern');
    if (!pattern) return;
    
    pattern.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = '✦';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (Math.random() * 20 + 10) + 'px';
        star.style.animationDelay = Math.random() * 3 + 's';
        pattern.appendChild(star);
    }
}

// مؤقت النشاط
let activityTimer;
function startTimer() {
    stopTimer();
    activityTimer = setInterval(() => {
        saveProgress();
        checkStoppedStudents();
    }, 60000); // كل دقيقة
}

function stopTimer() {
    if (activityTimer) {
        clearInterval(activityTimer);
    }
}

// لوحة المشرف
function renderAdminDashboard() {
    renderStudentsTable();
    renderQuestionsList();
    renderSectionsList();
    renderStoppedList();
    updateTestFilters();
}

// عرض جدول الطلاب
function renderStudentsTable() {
    const table = document.getElementById('studentsTable');
    const filter = document.getElementById('testFilter').value;
    
    let students = DB.students.filter(s => s.testId == filter || !filter);
    
    // ترتيب حسب الدرجة
    students.sort((a, b) => (b.score || 0) - (a.score || 0));
    
    table.innerHTML = `
        <div class="table-row header">
            <span>الاسم</span>
            <span>الاختبار</span>
            <span>الدرجة</span>
            <span>التقدم</span>
            <span>الإجراءات</span>
        </div>
    `;
    
    students.forEach(student => {
        const test = DB.tests.find(t => t.id === student.testId);
        const progress = student.completed ? 
            `<span class="progress-status completed">مكتمل</span>` :
            `<span class="progress-status incomplete">${student.currentQuestion}/${test?.questions.length || 0}</span>`;
        
        const row = document.createElement('div');
        row.className = 'table-row';
        row.innerHTML = `
            <span>${student.name}</span>
            <span>${student.testName}</span>
            <span>${student.completed ? student.score + '/' + student.totalQuestions : '-'}</span>
            <span>${progress}</span>
            <span>
                <button class="btn-icon btn-delete" onclick="deleteStudent('${student.name}', ${student.testId})">
                    <i class="fas fa-trash"></i>
                </button>
            </span>
        `;
        table.appendChild(row);
    });
}

// حذف طالب
function deleteStudent(name, testId) {
    if (confirm(`هل أنت متأكد من حذف ${name} من هذا الاختبار؟`)) {
        DB.students = DB.students.filter(s => !(s.name === name && s.testId === testId));
        saveData();
        renderStudentsTable();
    }
}

// عرض قائمة الأسئلة
function renderQuestionsList() {
    const list = document.getElementById('questionsList');
    const testSelect = document.getElementById('testSelect');
    
    const testId = testSelect.value;
    if (!testId) {
        list.innerHTML = '<p class="info-text">الرجاء اختيار اختبار لعرض أسئلته</p>';
        return;
    }
    
    const test = DB.tests.find(t => t.id == testId);
    if (!test) return;
    
    list.innerHTML = '';
    
    test.questions.forEach((question, index) => {
        const item = document.createElement('div');
        item.className = 'question-item';
        item.innerHTML = `
            <div>
                <strong>س${index + 1}: ${question.text.substring(0, 50)}...</strong>
                <p style="color: var(--text-secondary); font-size: 13px;">${question.category || ''}</p>
            </div>
            <div class="question-item-actions">
                <button class="btn-icon btn-edit" onclick="editQuestion(${testId}, ${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteQuestion(${testId}, ${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        list.appendChild(item);
    });
}

// إضافة سؤال
function showAddQuestionForm() {
    document.getElementById('addQuestionForm').classList.add('active');
}

async function handleAddQuestion(e) {
    e.preventDefault();
    
    const testId = document.getElementById('testSelect').value;
    if (!testId) {
        alert('الرجاء اختيار اختبار أولاً');
        return;
    }
    
    const test = DB.tests.find(t => t.id == testId);
    const newQuestion = {
        text: document.getElementById('qText').value,
        options: [
            document.getElementById('opt1').value,
            document.getElementById('opt2').value,
            document.getElementById('opt3').value,
            document.getElementById('opt4').value
        ],
        correct: parseInt(document.getElementById('correctAnswer').value),
        category: document.getElementById('qCategory').value
    };
    
    test.questions.push(newQuestion);
    
    // حفظ في Firebase
    await saveTest(test);
    
    document.getElementById('questionForm').reset();
    document.getElementById('addQuestionForm').classList.remove('active');
    renderQuestionsList();
}

// حذف سؤال
async function deleteQuestion(testId, index) {
    if (confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
        const test = DB.tests.find(t => t.id === testId);
        test.questions.splice(index, 1);
        
        // حفظ في Firebase
        await saveTest(test);
        
        renderQuestionsList();
    }
}

// تعديل سؤال
async function editQuestion(testId, index) {
    const test = DB.tests.find(t => t.id === testId);
    const question = test.questions[index];
    
    document.getElementById('qText').value = question.text;
    document.getElementById('opt1').value = question.options[0];
    document.getElementById('opt2').value = question.options[1];
    document.getElementById('opt3').value = question.options[2];
    document.getElementById('opt4').value = question.options[3];
    document.getElementById('correctAnswer').value = question.correct;
    document.getElementById('qCategory').value = question.category || '';
    
    document.getElementById('addQuestionForm').classList.add('active');
    
    // تغيير وظيفة الحفظ لحذف القديم وإضافة الجديد
    const form = document.getElementById('questionForm');
    form.onsubmit = async function(e) {
        e.preventDefault();
        test.questions[index] = {
            text: document.getElementById('qText').value,
            options: [
                document.getElementById('opt1').value,
                document.getElementById('opt2').value,
                document.getElementById('opt3').value,
                document.getElementById('opt4').value
            ],
            correct: parseInt(document.getElementById('correctAnswer').value),
            category: document.getElementById('qCategory').value
        };
        
        // حفظ في Firebase
        await saveTest(test);
        
        document.getElementById('questionForm').reset();
        document.getElementById('addQuestionForm').classList.remove('active');
        renderQuestionsList();
        form.onsubmit = handleAddQuestion;
    };
}

// عرض قائمة الأقسام
function renderSectionsList() {
    const list = document.getElementById('sectionsList');
    list.innerHTML = '';
    
    const now = Date.now();
    const fiveDays = 5 * 24 * 60 * 60 * 1000;
    
    DB.tests.forEach(test => {
        const item = document.createElement('div');
        item.className = 'section-item';
        
        const isNew = now - test.createdAt < fiveDays;
        
        item.innerHTML = `
            <div>
                <h4>${isNew ? '<span style="background: #f59e0b; color: white; padding: 2px 10px; border-radius: 10px; font-size: 12px; margin-left: 8px;" class="new-badge-label">جديد</span>' : ''}${test.name}</h4>
                <p style="color: var(--text-secondary); font-size: 13px;">${test.questions.length} سؤال</p>
            </div>
            <div class="section-item-actions">
                <button class="btn-icon btn-delete" onclick="deleteSection(${test.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        list.appendChild(item);
    });
    
    // عرض نموذج JSON
    const template = {
        "name": "اسم القسم",
        "description": "وصف القسم",
        "icon": "fa-book",
        "questions": [
            {
                "text": "نص السؤال",
                "options": ["الخيار 1", "الخيار 2", "الخيار 3", "الخيار 4"],
                "correct": 0,
                "category": "اسم القسم/التصنيف"
            }
        ]
    };
    
    document.getElementById('jsonTemplate').textContent = JSON.stringify(template, null, 2);
}

// إضافة قسم جديد
function showAddSectionModal() {
    document.getElementById('addSectionModal').classList.add('active');
}

async function handleJsonUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async function(event) {
        try {
            const data = JSON.parse(event.target.result);
            
            const newTest = {
                name: data.name || 'قسم جديد',
                description: data.description || '',
                icon: data.icon || 'fa-book',
                questions: data.questions || [],
                createdAt: Date.now()
            };
            
            // حفظ في Firebase
            await db.collection('tests').add(newTest);
            
            document.getElementById('addSectionModal').classList.remove('active');
            document.getElementById('jsonFile').value = '';
            
            // إعادة تحميل البيانات
            await loadData();
            renderSectionsList();
            alert('تم إضافة القسم بنجاح!');
        } catch (error) {
            alert('خطأ في قراءة الملف. تأكد من صحة صيغة JSON');
        }
    };
    reader.readAsText(file);
}

// حذف قسم
async function deleteSection(testId) {
    if (confirm('هل أنت متأكد من حذف هذا القسم بالكامل؟')) {
        // حذف من Firebase
        await deleteTestFromFirebase(testId);
        renderSectionsList();
    }
}

// عرض الطلاب المتوقفين
function renderStoppedList() {
    const list = document.getElementById('stoppedList');
    list.innerHTML = '';
    
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    const stopped = DB.students.filter(s => {
        return !s.completed && (now - s.lastActivity) > fiveMinutes;
    });
    
    if (stopped.length === 0) {
        list.innerHTML = '<p class="info-text">لا يوجد طلاب متوقفون حالياً</p>';
        return;
    }
    
    stopped.forEach(student => {
        const minutes = Math.floor((now - student.lastActivity) / 60000);
        const item = document.createElement('div');
        item.className = 'stopped-item';
        item.innerHTML = `
            <div>
                <strong>${student.name}</strong>
                <p style="color: var(--text-secondary); font-size: 13px;">${student.testName} - توقف منذ ${minutes} دقيقة</p>
            </div>
            <button class="btn-icon btn-delete" onclick="deleteStudent('${student.name}', ${student.testId})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        list.appendChild(item);
    });
}

function checkStoppedStudents() {
    renderStoppedList();
}

// تحديث فلاتر الاختبارات
function updateTestFilters() {
    const testFilter = document.getElementById('testFilter');
    const testSelect = document.getElementById('testSelect');
    
    testFilter.innerHTML = '<option value="">جميع الاختبارات</option>';
    testSelect.innerHTML = '<option value="">اختر الاختبار</option>';
    
    DB.tests.forEach(test => {
        testFilter.innerHTML += `<option value="${test.id}">${test.name}</option>`;
        testSelect.innerHTML += `<option value="${test.id}">${test.name}</option>`;
    });
}

// بدء التطبيق
function init() {
    loadData();
    setupEventListeners();
    createStars(); // إنشاء نجوم الخلفية
    
    if (DB.currentUser) {
        if (DB.currentUser.name === DB.adminName) {
            showPage('adminPage');
            renderAdminDashboard();
        } else {
            document.getElementById('userName').textContent = DB.currentUser.name;
            showPage('mainPage');
            renderTestsGrid();
        }
    } else {
        showPage('loginPage');
    }
}

init();
