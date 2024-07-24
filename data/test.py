import json

data1 = [{'title': 'Cube2Pipes : Investigating Hybrid Gameplay Using AR and a Tangible 3D Puzzle',
  'authors': 'Sukanya Bhattacharjee, Parag Chaudhuri',
  'time': '19 July 2024',
  'abstract': "We present our game, Cube2Pipes, as an attempt to investigate a unique gameplay design where we use a tangible 3D spatial puzzle, in the form of a 2X2 Rubik's Cube, as an interface to a tabletop mobile augmented reality (AR) game. The game interface adapts to user movement and interaction with both virtual and tangible elements via computer vision based tracking. This game can be seen as an instance of generic interactive hybrid systems as it involves interaction with both virtual and real, tangible elements. We present a thorough user evaluation about various aspects of the gameplay in order to answer the question as to whether hybrid gameplay involving both real and virtual interfaces and elements is more captivating and preferred by users, than standard (baseline) gameplay with only virtual elements. We use multiple industry standard user study questionnaires to try and answer this question. We also try to determine whether the game facilitates understanding of the spatial moves required to solve a Rubik's Cube, and the efficacy of a tangible puzzle interface to a tabletop AR game.",
  'url': 'https://arxiv.org/abs/2407.12786'},
 {'title': 'GameVibe: A Multimodal Affective Game Corpus',
  'authors': 'Matthew Barthet, Maria Kaselimi, Kosmas Pinitas, Konstantinos Makantasis, Antonios Liapis, Georgios N. Yannakakis',
  'time': '19 July 2024',
  'abstract': 'As online video and streaming platforms continue to grow, affective computing research has undergone a shift towards more complex studies involving multiple modalities. However, there is still a lack of readily available datasets with high-quality audiovisual stimuli. In this paper, we present GameVibe, a novel affect corpus which consists of multimodal audiovisual stimuli, including in-game behavioural observations and third-person affect labels for viewer engagement. The corpus consists of videos from a diverse set of publicly available gameplay sessions across 30 games, with particular attention to ensure high-quality stimuli with good audiovisual and gameplay diversity. Furthermore, we present an analysis on the reliability of the annotators in terms of inter-annotator agreement.',
  'url': 'https://arxiv.org/abs/2407.12787'},
 {'title': 'SS-ADA: A Semi-Supervised Active Domain Adaptation Framework for Semantic Segmentation',
  'authors': 'Weihao Yan, Yeqiang Qian, Yueyuan Li, Tao Li, Chunxiang Wang, Ming Yang',
  'time': '19 July 2024',
  'abstract': 'Semantic segmentation plays an important role in intelligent vehicles, providing pixel-level semantic information about the environment. However, the labeling budget is expensive and time-consuming when semantic segmentation model is applied to new driving scenarios. To reduce the costs, semi-supervised semantic segmentation methods have been proposed to leverage large quantities of unlabeled images. Despite this, their performance still falls short of the accuracy required for practical applications, which is typically achieved by supervised learning. A significant shortcoming is that they typically select unlabeled images for annotation randomly, neglecting the assessment of sample value for model training. In this paper, we propose a novel semi-supervised active domain adaptation (SS-ADA) framework for semantic segmentation that employs an image-level acquisition strategy. SS-ADA integrates active learning into semi-supervised semantic segmentation to achieve the accuracy of supervised learning with a limited amount of labeled data from the target domain. Additionally, we design an IoU-based class weighting strategy to alleviate the class imbalance problem using annotations from active learning. We conducted extensive experiments on synthetic-to-real and real-to-real domain adaptation settings. The results demonstrate the effectiveness of our method. SS-ADA can achieve or even surpass the accuracy of its supervised learning counterpart with only 25% of the target labeled data when using a real-time segmentation model. The code for SS-ADA is available at this https URL.',
  'url': 'https://arxiv.org/abs/2407.12788'},
 {'title': 'GPT Czech Poet: Generation of Czech Poetic Strophes with Language Models',
  'authors': 'Michal Chudoba, Rudolf Rosa',
  'time': '19 July 2024',
  'abstract': 'High-quality automated poetry generation systems are currently only available for a small subset of languages. We introduce a new model for generating poetry in Czech language, based on fine-tuning a pre-trained Large Language Model. We demonstrate that guiding the generation process by explicitly specifying strophe parameters within the poem text strongly improves the effectiveness of the model. We also find that appropriate tokenization is crucial, showing that tokenization methods based on syllables or individual characters instead of subwords prove superior in generating poetic strophes. We further enhance the results by introducing Forced generation, adding explicit specifications of meter and verse parameters at inference time based on the already generated text. We evaluate a range of setups, showing that our proposed approach achieves high accuracies in rhyming and metric aspects of formal quality of the generated poems.',
  'url': 'https://arxiv.org/abs/2407.12790'},
 {'title': 'TourLLM: Enhancing LLMs with Tourism Knowledge',
  'authors': 'Qikai Wei, Mingzhi Yang, Jinqiang Wang, Wenwei Mao, Jiabo Xu, Huansheng Ning',
  'time': '19 July 2024',
  'abstract': 'Recently, large language models (LLMs) have demonstrated their effectiveness in various natural language processing (NLP) tasks. However, the lack of tourism knowledge limits the performance of LLMs in tourist attraction presentations and travel planning. To address this challenge, we constructed a supervised fine-tuning dataset for the culture and tourism domain, named Cultour. This dataset consists of three parts: tourism knowledge base QA data, travelogues data, and tourism diversity QA data. Additionally, we propose TourLLM, a Qwen-based model supervised fine-tuned with Cultour, to improve the quality of the information provided about attractions and travel planning. To evaluate the performance of TourLLM, we employed both automatic and human evaluation, and we proposed a human evaluation criterion named CRA (Consistency, Readability, Availability). The experimental results demonstrate the effectiveness of the responses generated by the TourLLM. Our proposed Cultour is accessible at this https URL.',
  'url': 'https://arxiv.org/abs/2407.12791'},
 {'title': 'Visually Robust Adversarial Imitation Learning from Videos with Contrastive Learning',
  'authors': 'Vittorio Giammarino, James Queeney, Ioannis Ch. Paschalidis',
  'time': '19 July 2024',
  'abstract': 'We propose C-LAIfO, a computationally efficient algorithm designed for imitation learning from videos, even in the presence of visual mismatch between agent and expert domains. We analyze the problem of imitation from expert videos with visual discrepancies, and introduce a solution for robust latent space estimation using contrastive learning and data augmentation. Provided a visually robust latent space, our algorithm performs imitation entirely within this space using off-policy adversarial imitation learning. We conduct a thorough ablation study to justify our design choices and test C-LAIfO on high-dimensional continuous robotic tasks. Additionally, we demonstrate how C-LAIfO can be combined with other reward signals to facilitate learning on a set of challenging hand manipulation tasks with sparse rewards. Our experiments show improved performance compared to baseline methods, highlighting the effectiveness and versatility of C-LAIfO. To ensure reproducibility, we provide open access to our code.',
  'url': 'https://arxiv.org/abs/2407.12792'},
 {'title': 'Data Collection and Labeling Techniques for Machine Learning',
  'authors': 'Qianyu Huang, Tongfang Zhao',
  'time': '19 July 2024',
  'abstract': 'Data collection and labeling are critical bottlenecks in the deployment of machine learning applications. With the increasing complexity and diversity of applications, the need for efficient and scalable data collection and labeling techniques has become paramount. This paper provides a review of the state-of-the-art methods in data collection, data labeling, and the improvement of existing data and models. By integrating perspectives from both the machine learning and data management communities, we aim to provide a holistic view of the current landscape and identify future research directions.',
  'url': 'https://arxiv.org/abs/2407.12793'},
 {'title': 'Learned Graph Rewriting with Equality Saturation: A New Paradigm in Relational Query Rewrite and Beyond',
  'authors': 'George-Octavian Bărbulescu, Taiyi Wang, Zak Singh, Eiko Yoneki',
  'time': '19 July 2024',
  'abstract': 'Query rewrite systems perform graph substitutions using rewrite rules to generate optimal SQL query plans. Rewriting logical and physical relational query plans is proven to be an NP-hard sequential decision-making problem with a search space exponential in the number of rewrite rules. In this paper, we address the query rewrite problem by interleaving Equality Saturation and Graph Reinforcement Learning (RL). The proposed system, Aurora, rewrites relational queries by guiding Equality Saturation, a method from compiler literature to perform non-destructive graph rewriting, with a novel RL agent that embeds both the spatial structure of the query graph as well as the temporal dimension associated with the sequential construction of query plans. Our results show Graph Reinforcement Learning for non-destructive graph rewriting yields SQL plans orders of magnitude faster than existing equality saturation solvers, while also achieving competitive results against mainstream query optimisers.',
  'url': 'https://arxiv.org/abs/2407.12794'},
 {'title': 'The need of a self for self-driving cars a theoretical model applying homeostasis to self driving',
  'authors': 'Martin Schmalzried',
  'time': '19 July 2024',
  'abstract': 'This paper explores the concept of creating a "self" for self-driving cars through a homeostatic architecture designed to enhance their autonomy, safety, and efficiency. The proposed system integrates inward focused sensors to monitor the car\'s internal state, such as the condition of its metal bodywork, wheels, engine, and battery, establishing a baseline homeostatic state representing optimal functionality. Outward facing sensors, like cameras and LIDAR, are then interpreted via their impact on the car\'s homeostatic state by quantifying deviations from homeostasis. This contrasts with the approach of trying to make cars "see" reality in a similar way to humans and identify elements in their reality in the same way humans. Virtual environments would be leveraged to accelerate training. Additionally, cars are programmed to communicate and share experiences via blockchain technology, learning from each other\'s mistakes while maintaining individualized training models. A dedicated language for self-driving cars is proposed to enable nuanced interpretation and response to environmental data. This architecture allows self-driving cars to dynamically adjust their behavior based on internal and external feedback, promoting cooperation and continuous improvement. The study concludes by discussing the broader implications for AI development, potential real-world applications, and future research directions.',
  'url': 'https://arxiv.org/abs/2407.12795'},
 {'title': 'AI Agents and Education: Simulated Practice at Scale',
  'authors': 'Ethan Mollick, Lilach Mollick, Natalie Bach, LJ Ciccarelli, Ben Przystanski, Daniel Ravipinto',
  'time': '19 July 2024',
  'abstract': 'This paper explores the potential of generative AI in creating adaptive educational simulations. By leveraging a system of multiple AI agents, simulations can provide personalized learning experiences, offering students the opportunity to practice skills in scenarios with AI-generated mentors, role-players, and instructor-facing evaluators. We describe a prototype, PitchQuest, a venture capital pitching simulator that showcases the capabilities of AI in delivering instruction, facilitating practice, and providing tailored feedback. The paper discusses the pedagogy behind the simulation, the technology powering it, and the ethical considerations in using AI for education. While acknowledging the limitations and need for rigorous testing, we propose that generative AI can significantly lower the barriers to creating effective, engaging simulations, opening up new possibilities for experiential learning at scale.',
  'url': 'https://arxiv.org/abs/2407.12796'}]

data2= [
  {
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
    "arxiv_id": "2407.12794",
    "summary": "This paper introduces Aurora, a system for relational query rewrite that combines Equality Saturation with Graph Reinforcement Learning. Aurora uses a novel RL agent to guide Equality Saturation, achieving faster and more efficient query rewriting compared to existing methods.",
    "tags": [
      "database",
      "query optimization",
      "graph learning",
      "reinforcement learning"
    ]
  }]


summary_dict = {item['arxiv_id']: item for item in data2}
for item in data1:
    item['id'] = item['url'].split('/')[-1]

result = []
for item in data1:
    arxiv_id = item['id']
    if arxiv_id in summary_dict:
        combined_item = {**item, **summary_dict[arxiv_id]}
        result.append(combined_item)


with open('combined_data.json', 'w') as f:
    json.dump(result, f, indent=4)

print(len(result))