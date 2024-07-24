import json

arxiv = [
  {
    "title": "Cube2Pipes : Investigating Hybrid Gameplay Using AR and a Tangible 3D Puzzle",
    "authors": "Sukanya Bhattacharjee, Parag Chaudhuri",
    "time": "19 July 2024",
    "abstract": "We present our game, Cube2Pipes, as an attempt to investigate a unique gameplay design where we use a tangible 3D spatial puzzle, in the form of a 2X2 Rubik's Cube, as an interface to a tabletop mobile augmented reality (AR) game. The game interface adapts to user movement and interaction with both virtual and tangible elements via computer vision based tracking. This game can be seen as an instance of generic interactive hybrid systems as it involves interaction with both virtual and real, tangible elements. We present a thorough user evaluation about various aspects of the gameplay in order to answer the question as to whether hybrid gameplay involving both real and virtual interfaces and elements is more captivating and preferred by users, than standard (baseline) gameplay with only virtual elements. We use multiple industry standard user study questionnaires to try and answer this question. We also try to determine whether the game facilitates understanding of the spatial moves required to solve a Rubik's Cube, and the efficacy of a tangible puzzle interface to a tabletop AR game.",
    "url": "https://arxiv.org/abs/2407.12786",
    "id": "2407.12786",
    "arxiv_id": "2407.12786",
    "summary": "This paper presents Cube2Pipes, a game that investigates hybrid gameplay using augmented reality (AR) and a tangible 3D puzzle. The game interface adapts to user movement and interaction with both virtual and tangible elements. A user study evaluates the game's effectiveness in comparing hybrid gameplay to standard gameplay with only virtual elements. The study also explores whether the game facilitates understanding of spatial moves required to solve a Rubik's Cube.",
    "tags": [
      "computer graphics",
      "augmented reality",
      "game design",
      "human-computer interaction"
    ]
  },
  {
    "title": "GameVibe: A Multimodal Affective Game Corpus",
    "authors": "Matthew Barthet, Maria Kaselimi, Kosmas Pinitas, Konstantinos Makantasis, Antonios Liapis, Georgios N. Yannakakis",
    "time": "19 July 2024",
    "abstract": "As online video and streaming platforms continue to grow, affective computing research has undergone a shift towards more complex studies involving multiple modalities. However, there is still a lack of readily available datasets with high-quality audiovisual stimuli. In this paper, we present GameVibe, a novel affect corpus which consists of multimodal audiovisual stimuli, including in-game behavioural observations and third-person affect labels for viewer engagement. The corpus consists of videos from a diverse set of publicly available gameplay sessions across 30 games, with particular attention to ensure high-quality stimuli with good audiovisual and gameplay diversity. Furthermore, we present an analysis on the reliability of the annotators in terms of inter-annotator agreement.",
    "url": "https://arxiv.org/abs/2407.12787",
    "id": "2407.12787",
    "arxiv_id": "2407.12787",
    "summary": "This paper introduces GameVibe, a novel multimodal affective game corpus consisting of audiovisual stimuli from diverse gameplay sessions across 30 games. The corpus includes behavioral observations and third-person affect labels for viewer engagement. An analysis of the annotator reliability is also presented.",
    "tags": [
      "computer vision",
      "affective computing",
      "game studies",
      "datasets"
    ]
  },
  {
    "title": "SS-ADA: A Semi-Supervised Active Domain Adaptation Framework for Semantic Segmentation",
    "authors": "Weihao Yan, Yeqiang Qian, Yueyuan Li, Tao Li, Chunxiang Wang, Ming Yang",
    "time": "19 July 2024",
    "abstract": "Semantic segmentation plays an important role in intelligent vehicles, providing pixel-level semantic information about the environment. However, the labeling budget is expensive and time-consuming when semantic segmentation model is applied to new driving scenarios. To reduce the costs, semi-supervised semantic segmentation methods have been proposed to leverage large quantities of unlabeled images. Despite this, their performance still falls short of the accuracy required for practical applications, which is typically achieved by supervised learning. A significant shortcoming is that they typically select unlabeled images for annotation randomly, neglecting the assessment of sample value for model training. In this paper, we propose a novel semi-supervised active domain adaptation (SS-ADA) framework for semantic segmentation that employs an image-level acquisition strategy. SS-ADA integrates active learning into semi-supervised semantic segmentation to achieve the accuracy of supervised learning with a limited amount of labeled data from the target domain. Additionally, we design an IoU-based class weighting strategy to alleviate the class imbalance problem using annotations from active learning. We conducted extensive experiments on synthetic-to-real and real-to-real domain adaptation settings. The results demonstrate the effectiveness of our method. SS-ADA can achieve or even surpass the accuracy of its supervised learning counterpart with only 25% of the target labeled data when using a real-time segmentation model. The code for SS-ADA is available at this https URL.",
    "url": "https://arxiv.org/abs/2407.12788",
    "id": "2407.12788",
    "arxiv_id": "2407.12788",
    "summary": "This paper proposes SS-ADA, a semi-supervised active domain adaptation (SS-ADA) framework for semantic segmentation. SS-ADA integrates active learning into semi-supervised semantic segmentation to achieve the accuracy of supervised learning with limited labeled data from the target domain. An IoU-based class weighting strategy is also introduced to address the class imbalance problem.",
    "tags": [
      "computer vision",
      "machine learning",
      "domain adaptation",
      "semantic segmentation"
    ]
  },
  {
    "title": "GPT Czech Poet: Generation of Czech Poetic Strophes with Language Models",
    "authors": "Michal Chudoba, Rudolf Rosa",
    "time": "19 July 2024",
    "abstract": "High-quality automated poetry generation systems are currently only available for a small subset of languages. We introduce a new model for generating poetry in Czech language, based on fine-tuning a pre-trained Large Language Model. We demonstrate that guiding the generation process by explicitly specifying strophe parameters within the poem text strongly improves the effectiveness of the model. We also find that appropriate tokenization is crucial, showing that tokenization methods based on syllables or individual characters instead of subwords prove superior in generating poetic strophes. We further enhance the results by introducing Forced generation, adding explicit specifications of meter and verse parameters at inference time based on the already generated text. We evaluate a range of setups, showing that our proposed approach achieves high accuracies in rhyming and metric aspects of formal quality of the generated poems.",
    "url": "https://arxiv.org/abs/2407.12790",
    "id": "2407.12790",
    "arxiv_id": "2407.12790",
    "summary": "This paper presents GPT Czech Poet, a model for generating Czech poetry based on a pre-trained large language model. The study demonstrates that guiding the generation process by specifying strophe parameters improves the model's effectiveness. The authors also find that appropriate tokenization is crucial for generating poetic strophes.",
    "tags": [
      "natural language processing",
      "machine translation",
      "poetry generation",
      "Czech language"
    ]
  },
  {
    "title": "TourLLM: Enhancing LLMs with Tourism Knowledge",
    "authors": "Qikai Wei, Mingzhi Yang, Jinqiang Wang, Wenwei Mao, Jiabo Xu, Huansheng Ning",
    "time": "19 July 2024",
    "abstract": "Recently, large language models (LLMs) have demonstrated their effectiveness in various natural language processing (NLP) tasks. However, the lack of tourism knowledge limits the performance of LLMs in tourist attraction presentations and travel planning. To address this challenge, we constructed a supervised fine-tuning dataset for the culture and tourism domain, named Cultour. This dataset consists of three parts: tourism knowledge base QA data, travelogues data, and tourism diversity QA data. Additionally, we propose TourLLM, a Qwen-based model supervised fine-tuned with Cultour, to improve the quality of the information provided about attractions and travel planning. To evaluate the performance of TourLLM, we employed both automatic and human evaluation, and we proposed a human evaluation criterion named CRA (Consistency, Readability, Availability). The experimental results demonstrate the effectiveness of the responses generated by the TourLLM. Our proposed Cultour is accessible at this https URL.",
    "url": "https://arxiv.org/abs/2407.12791",
    "id": "2407.12791",
    "arxiv_id": "2407.12791",
    "summary": "This paper introduces TourLLM, a Qwen-based model fine-tuned with a new dataset called Cultour, designed to enhance the quality of information provided about tourist attractions and travel planning. The authors evaluate TourLLM's performance using automatic and human evaluation, proposing a new human evaluation criterion named CRA (Consistency, Readability, Availability).",
    "tags": [
      "natural language processing",
      "travel",
      "tourism",
      "question answering"
    ]
  },
  {
    "title": "Visually Robust Adversarial Imitation Learning from Videos with Contrastive Learning",
    "authors": "Vittorio Giammarino, James Queeney, Ioannis Ch. Paschalidis",
    "time": "19 July 2024",
    "abstract": "We propose C-LAIfO, a computationally efficient algorithm designed for imitation learning from videos, even in the presence of visual mismatch between agent and expert domains. We analyze the problem of imitation from expert videos with visual discrepancies, and introduce a solution for robust latent space estimation using contrastive learning and data augmentation. Provided a visually robust latent space, our algorithm performs imitation entirely within this space using off-policy adversarial imitation learning. We conduct a thorough ablation study to justify our design choices and test C-LAIfO on high-dimensional continuous robotic tasks. Additionally, we demonstrate how C-LAIfO can be combined with other reward signals to facilitate learning on a set of challenging hand manipulation tasks with sparse rewards. Our experiments show improved performance compared to baseline methods, highlighting the effectiveness and versatility of C-LAIfO. To ensure reproducibility, we provide open access to our code.",
    "url": "https://arxiv.org/abs/2407.12792",
    "id": "2407.12792",
    "arxiv_id": "2407.12792",
    "summary": "This paper proposes C-LAIfO, an algorithm for imitation learning from videos, even in the presence of visual mismatch. C-LAIfO leverages contrastive learning and data augmentation to achieve visually robust latent space estimation. It then uses off-policy adversarial imitation learning within this space. Experiments demonstrate C-LAIfO's effectiveness on high-dimensional continuous robotic tasks.",
    "tags": [
      "machine learning",
      "reinforcement learning",
      "computer vision",
      "robotics"
    ]
  },
  {
    "title": "Data Collection and Labeling Techniques for Machine Learning",
    "authors": "Qianyu Huang, Tongfang Zhao",
    "time": "19 July 2024",
    "abstract": "Data collection and labeling are critical bottlenecks in the deployment of machine learning applications. With the increasing complexity and diversity of applications, the need for efficient and scalable data collection and labeling techniques has become paramount. This paper provides a review of the state-of-the-art methods in data collection, data labeling, and the improvement of existing data and models. By integrating perspectives from both the machine learning and data management communities, we aim to provide a holistic view of the current landscape and identify future research directions.",
    "url": "https://arxiv.org/abs/2407.12793",
    "id": "2407.12793",
    "arxiv_id": "2407.12793",
    "summary": "This paper reviews the state-of-the-art methods in data collection and labeling for machine learning. It discusses both the challenges and opportunities in this field, highlighting the need for efficient and scalable techniques to meet the growing demands of machine learning applications.",
    "tags": [
      "machine learning",
      "data science",
      "data collection",
      "data labeling"
    ]
  },
  {
    "title": "Learned Graph Rewriting with Equality Saturation: A New Paradigm in Relational Query Rewrite and Beyond",
    "authors": "George-Octavian B\u0103rbulescu, Taiyi Wang, Zak Singh, Eiko Yoneki",
    "time": "19 July 2024",
    "abstract": "Query rewrite systems perform graph substitutions using rewrite rules to generate optimal SQL query plans. Rewriting logical and physical relational query plans is proven to be an NP-hard sequential decision-making problem with a search space exponential in the number of rewrite rules. In this paper, we address the query rewrite problem by interleaving Equality Saturation and Graph Reinforcement Learning (RL). The proposed system, Aurora, rewrites relational queries by guiding Equality Saturation, a method from compiler literature to perform non-destructive graph rewriting, with a novel RL agent that embeds both the spatial structure of the query graph as well as the temporal dimension associated with the sequential construction of query plans. Our results show Graph Reinforcement Learning for non-destructive graph rewriting yields SQL plans orders of magnitude faster than existing equality saturation solvers, while also achieving competitive results against mainstream query optimisers.",
    "url": "https://arxiv.org/abs/2407.12794",
    "id": "2407.12794",
    "arxiv_id": "2407.12794",
    "summary": "This paper introduces Aurora, a system for relational query rewrite that combines Equality Saturation with Graph Reinforcement Learning. Aurora uses a novel RL agent to guide Equality Saturation, achieving faster and more efficient query rewriting compared to existing methods.",
    "tags": [
      "database",
      "query optimization",
      "graph learning",
      "reinforcement learning"
    ]
  }
]

hackernews = [
  {
    "title": "So you think you know box shadows?",
    "creator": "yohannesk",
    "time_created": "6 hours ago",
    "points": 293,
    "num_comments": 43,
    "post_url": "https://dgerrells.com/blog/how-not-to-use-box-shadows",
    "tags": ["CSS", "Web Development"],
    "summary": "An in-depth exploration of box shadows in CSS, discussing common misconceptions and advanced techniques for better design."
  },
  {
    "title": "Mining JIT traces for missing optimizations with Z3",
    "creator": "matt_d",
    "time_created": "4 hours ago",
    "points": 64,
    "num_comments": 19,
    "post_url": "https://pypy.org/posts/2024/07/mining-jit-traces-missing-optimizations-z3.html",
    "tags": ["JIT", "Optimization", "Z3", "Programming"],
    "summary": "A detailed analysis on how to use Z3 to find missing optimizations in Just-In-Time (JIT) compiled code, focusing on improving performance."
  },
  {
    "title": "rr – record and replay debugger for C/C++",
    "creator": "levzettelin",
    "time_created": "10 hours ago",
    "points": 236,
    "num_comments": 81,
    "post_url": "https://rr-project.org/",
    "tags": ["Debugger", "C/C++", "Programming Tools"],
    "summary": "An introduction to rr, a debugger for C/C++ that allows recording and replaying of program execution, making debugging more efficient."
  },
  {
    "title": "What is the significance of the character \"j\" at the end of a Roman Numeral? (2013)",
    "creator": "kamaraju",
    "time_created": "13 hours ago",
    "points": 341,
    "num_comments": 124,
    "post_url": "https://genealogy.stackexchange.com/",
    "tags": ["History", "Roman Numerals"],
    "summary": "A historical analysis on the use of the character \"j\" in Roman numerals, exploring its origins and significance."
  },
  {
    "title": "Atlassian research highlights major disconnect between developers and leaders",
    "creator": "layer8",
    "time_created": "38 minutes ago",
    "points": 28,
    "num_comments": 6,
    "post_url": "https://atlassian.com",
    "tags": ["Research", "Developer Relations", "Leadership"],
    "summary": "Recent research by Atlassian reveals significant gaps in communication and expectations between software developers and organizational leaders."
  },
  {
    "title": "A brief history of Dell Unix",
    "creator": "fanf2",
    "time_created": "4 hours ago",
    "points": 21,
    "num_comments": 0,
    "post_url": "https://technologists.com",
    "tags": ["History", "Unix", "Dell"],
    "summary": "An overview of the history of Dell's Unix operating system, detailing its development and impact on the tech industry."
  },
  {
    "title": "GPG and Me",
    "creator": "udev4096",
    "time_created": "1 hour ago",
    "points": 6,
    "num_comments": 3,
    "post_url": "https://moxie.org",
    "tags": ["Security", "GPG", "Personal Experience"],
    "summary": "A personal account of experiences using GPG for secure communication, discussing challenges and benefits."
  },
  {
    "title": "Inkbase: Programmable Ink (2022)",
    "creator": "surprisetalk",
    "time_created": "7 hours ago",
    "points": 73,
    "num_comments": 13,
    "post_url": "https://inkandswitch.com",
    "tags": ["Innovation", "Ink Technology"],
    "summary": "An exploration of Inkbase, a technology allowing programmable ink, enabling new forms of digital and physical interactions."
  },
  {
    "title": "PgManage: Modern, cross platform graphical database client",
    "creator": "thunderbong",
    "time_created": "6 hours ago",
    "points": 69,
    "num_comments": 29,
    "post_url": "https://github.com/commandprompt",
    "tags": ["Database", "Graphical Client", "Cross-Platform"],
    "summary": "Introduction to PgManage, a modern graphical database client that supports multiple platforms, aimed at improving database management."
  },
  {
    "title": "Trellis (YC W24) is hiring engineer to build AI-powered ETL for unstructured data",
    "creator": "",
    "time_created": "1 hour ago",
    "points": 0,
    "num_comments": 0,
    "post_url": "https://ycombinator.com",
    "tags": ["Hiring", "AI", "ETL"],
    "summary": "Trellis, a YC W24 startup, is looking for engineers to develop AI-powered ETL solutions for handling unstructured data."
  },
  {
    "title": "Show HN: I made a tool to HTTPS your localhost",
    "creator": "rubi1945",
    "time_created": "7 hours ago",
    "points": 56,
    "num_comments": 26,
    "post_url": "https://lokal.so",
    "tags": ["Show HN", "HTTPS", "Local Development"],
    "summary": "A demonstration of a new tool that enables HTTPS for localhost environments, enhancing security during local development."
  },
  {
    "title": "Initial details about why CrowdStrike's CSAgent.sys crashed",
    "creator": "pilfered",
    "time_created": "18 hours ago",
    "points": 428,
    "num_comments": 529,
    "post_url": "https://twitter.com/patrickwardle",
    "tags": ["Security", "Bug Report", "CrowdStrike"],
    "summary": "An initial report on the reasons behind the crash of CrowdStrike's CSAgent.sys, detailing the issues and potential fixes."
  },
  {
    "title": "txtai: Open-source vector search and RAG for minimalists",
    "creator": "dmezzetti",
    "time_created": "7 hours ago",
    "points": 30,
    "num_comments": 2,
    "post_url": "https://neuml.github.io",
    "tags": ["Open Source", "Vector Search", "RAG"],
    "summary": "An introduction to txtai, an open-source tool for vector search and retrieval-augmented generation (RAG) designed for minimalists."
  },
  {
    "title": "Satellite Drag Analysis During the May 2024 Geomagnetic Storm",
    "creator": "croes",
    "time_created": "7 hours ago",
    "points": 34,
    "num_comments": 4,
    "post_url": "https://arxiv.org",
    "tags": ["Satellite", "Geomagnetic Storm", "Analysis"],
    "summary": "A study analyzing satellite drag during the geomagnetic storm in May 2024, examining its effects on satellite trajectories."
  },
  {
    "title": "Minuteman missile communications",
    "creator": "sklargh",
    "time_created": "22 hours ago",
    "points": 316,
    "num_comments": 49,
    "post_url": "https://computer.rip",
    "tags": ["History", "Military", "Communications"],
    "summary": "An exploration of the communication systems used in Minuteman missiles, detailing their development and operational history."
  },
  {
    "title": "NHRA's Alan Reinhart Explains Why John Force's Parachutes Failed to Deploy",
    "creator": "RickJWagner",
    "time_created": "4 hours ago",
    "points": 12,
    "num_comments": 3,
    "post_url": "https://bangshift.com",
    "tags": ["NHRA", "Parachutes", "Failure Analysis"],
    "summary": "A detailed explanation by NHRA's Alan Reinhart on the failure of John Force's parachutes to deploy during a race."
  },
  {
    "title": "Prometheus metrics saves us from painful kernel debugging (2022)",
    "creator": "goranmoomin",
    "time_created": "8 hours ago",
    "points": 54,
    "num_comments": 10,
    "post_url": "https://utcc.utoronto.ca",
    "tags": ["Prometheus", "Metrics", "Kernel Debugging"],
    "summary": "A case study on how Prometheus metrics were used to avoid complex kernel debugging, demonstrating the tool's effectiveness."
  },
  {
    "title": "A Linux kernel syscall implementation tracker",
    "creator": "halb",
    "time_created": "1 day ago",
    "points": 354,
    "num_comments": 61,
    "post_url": "https://mebeim.net",
    "tags": ["Linux", "Kernel", "Syscall Tracker"],
    "summary": "A tracker for Linux kernel syscalls, providing a comprehensive overview of implemented and pending syscalls."
  },
  {
    "title": "Artificial consciousness: a perspective from the free energy principle",
    "creator": "sabrina_ramonov",
    "time_created": "2 hours ago",
    "points": 23,
    "num_comments": 5,
    "post_url": "https://springer.com",
    "tags": ["Artificial Intelligence", "Consciousness", "Free Energy Principle"],
    "summary": "A theoretical discussion on artificial consciousness, framed through the lens of the free energy principle."
  },
  {
    "title": "Show HN: Moocable – find people studying the same online course/book",
    "creator": "junaid_97",
    "time_created": "5 hours ago",
    "points": 11,
    "num_comments": 4,
    "post_url": "https://moocable.com",
    "tags": ["Show HN", "Education", "Social Learning"],
    "summary": "A new tool that helps people find others studying the same online courses or books, fostering collaborative learning."
  },
  {
    "title": "Carving ELF Files",
    "creator": "joren485",
    "time_created": "5 hours ago",
    "points": 9,
    "num_comments": 0,
    "post_url": "https://nietaanraken.nl",
    "tags": ["ELF Files", "Forensics", "Carving"],
    "summary": "A technical guide on carving ELF files for forensic analysis, explaining techniques and tools used in the process."
  },
  {
    "title": "Club Mate: The Lost History of Germany's Trendiest Soda [video]",
    "creator": "motge",
    "time_created": "19 minutes ago",
    "points": 3,
    "num_comments": 0,
    "post_url": "https://youtube.com",
    "tags": ["Club Mate", "History", "Soda"],
    "summary": "A video documentary on the history of Club Mate, a popular soda in Germany, exploring its cultural impact."
  },
  {
    "title": "Intel says 13th and 14th Gen mobile CPUs are crashing",
    "creator": "markus_zhang",
    "time_created": "2 hours ago",
    "points": 16,
    "num_comments": 1,
    "post_url": "https://tomshardware.com",
    "tags": ["Intel", "CPU", "Crash"],
    "summary": "An update from Intel on the crashing issues affecting 13th and 14th generation mobile CPUs, discussing causes and solutions."
  },
  {
    "title": "Intel vs. Samsung vs. TSMC",
    "creator": "rbanffy",
    "time_created": "22 hours ago",
    "points": 195,
    "num_comments": 66,
    "post_url": "https://semiengineering.com",
    "tags": ["Semiconductors", "Intel", "Samsung", "TSMC"],
    "summary": "A comparative analysis of Intel, Samsung, and TSMC, focusing on their technological advancements and market competition."
  },
  {
    "title": "Google Distributed Cloud air-gapped appliance",
    "creator": "radeeyate",
    "time_created": "22 hours ago",
    "points": 165,
    "num_comments": 93,
    "post_url": "https://cloud.google.com",
    "tags": ["Google Cloud", "Air-Gapped", "Appliance"],
    "summary": "An introduction to Google's new air-gapped cloud appliance, designed for secure and isolated computing environments."
  },
  {
    "title": "Zettlr: One-Stop Publication Workbench",
    "creator": "hgyjnbdet",
    "time_created": "11 hours ago",
    "points": 78,
    "num_comments": 13,
    "post_url": "https://zettlr.com",
    "tags": ["Publication", "Writing Tools", "Workbench"],
    "summary": "Overview of Zettlr, a comprehensive tool for managing all aspects of publication, from writing to organizing and publishing."
  },
  {
    "title": "Building a Galaksija",
    "creator": "bane",
    "time_created": "15 hours ago",
    "points": 82,
    "num_comments": 14,
    "post_url": "https://vladovince.com",
    "tags": ["Retro Computing", "Galaksija", "DIY"],
    "summary": "A guide on building a Galaksija, a retro computer, with detailed instructions and historical context."
  },
  {
    "title": "Show HN: I made helpers for Web Components",
    "creator": "mfcc64",
    "time_created": "9 hours ago",
    "points": 27,
    "num_comments": 7,
    "post_url": "https://github.com/mfcc64",
    "tags": ["Show HN", "Web Components", "Development Tools"],
    "summary": "Presentation of new helper tools for web components, aimed at simplifying and enhancing web development workflows."
  },
  {
    "title": "Large models of what? Mistaking engineering achievements for linguistic agency",
    "creator": "Anon84",
    "time_created": "1 day ago",
    "points": 175,
    "num_comments": 126,
    "post_url": "https://arxiv.org",
    "tags": ["AI", "Large Models", "Linguistic Agency"],
    "summary": "A critical examination of large AI models, questioning the attribution of linguistic agency to engineering accomplishments."
  },
  {
    "title": "Trench collapses have killed hundreds of workers in the US over the last decade",
    "creator": "rntn",
    "time_created": "6 hours ago",
    "points": 111,
    "num_comments": 112,
    "post_url": "https://npr.org",
    "tags": ["Safety", "Trench Collapses", "Worker Deaths"],
    "summary": "An investigation into the high incidence of trench collapses in the US, highlighting safety failures and preventable deaths."
  }
]

for article in arxiv:
    article["type"] = 'research'

with open('research.json', 'w') as f:
    json.dump(arxiv, f, indent=4)

for article in hackernews:
    article["type"] = 'news'

with open('news.json', 'w') as f:
    json.dump(hackernews, f, indent=4)