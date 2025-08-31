import { NextRequest, NextResponse } from 'next/server';

// Mock database data (later vervangen door echte database)
const mockStationData = {
  wakefulness: {
    id: 'wakefulness',
    title: 'Al-yaqazah - Wakefulness',
    description: 'This station is about al-yaqazah, meaning wakefulness.',
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'Read & Learn',
        description: 'Knowledge Phase - Understanding the concept of wakefulness',
        content: [
          {
            id: 'quran-1',
            nodeType: 'quran',
            text: '"Say, \'Surely I admonish you with one (thing) only, that you rise up to God by twos and singly; thereafter meditate.\'" - Quran 34:46',
            order: 1
          },
          {
            id: 'intro-1',
            nodeType: 'intro',
            text: 'Standing up for Allah means waking up from the sleep of not paying attention, and getting out of the trap of laziness. It starts when the heart of the servant comes alive by seeing the light of being reminded. Wakefulness has three parts:',
            order: 2
          },
          {
            id: 'part-1',
            nodeType: 'part',
            text: 'The first is when the heart looks at Allah\'s blessings and realizes it can never count them or truly measure them. Then the heart focuses on knowing Allah\'s kindness in giving them, and on understanding one\'s own failure to give the right amount of thanks.',
            order: 3
          },
          {
            id: 'part-2',
            nodeType: 'part',
            text: 'The second is when a person sees their wrongdoings and understands how dangerous they are. Then they hurry to fix them, free themselves from being trapped by them, and look for safety by cleaning them away.',
            order: 4
          },
          {
            id: 'part-3',
            nodeType: 'part',
            text: 'The third is noticing how days pass and what we gain or lose in them. It means not wasting time but guarding it, so you can make up for what you missed and take full advantage of what\'s left.',
            order: 5
          }
        ]
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: 'Goals',
        description: 'Insight Phase - What you should aim to achieve',
        content: [
          {
            id: 'goals-list',
            nodeType: 'goals_list',
            text: 'From this station, you should aim to:',
            children: [
              {
                id: 'goal-1',
                nodeType: 'goal_item',
                text: 'Wake up from heedlessness and live with awareness of Allah.',
                order: 1
              },
              {
                id: 'goal-2',
                nodeType: 'goal_item',
                text: 'Recognize Allah\'s endless blessings and admit our shortcomings in gratitude.',
                order: 2
              },
              {
                id: 'goal-3',
                nodeType: 'goal_item',
                text: 'Notice your sins, see their danger, and work to get rid of them.',
                order: 3
              },
              {
                id: 'goal-4',
                nodeType: 'goal_item',
                text: 'Protect your time, avoid wasting it, and make up for missed opportunities.',
                order: 4
              },
              {
                id: 'goal-5',
                nodeType: 'goal_item',
                text: 'Keep your heart alive with reminders that guide you closer to Allah.',
                order: 5
              }
            ],
            order: 1
          }
        ]
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: 'Quiz',
        description: 'Understanding Phase - Test your knowledge',
        content: [
          {
            id: 'quiz-1',
            nodeType: 'quiz_question',
            text: 'What does "wakefulness" mean in this station?',
            order: 1,
            options: [
              { id: 'a', text: 'Sleeping early and waking up on time', isCorrect: false },
              { id: 'b', text: 'Waking up from heedlessness and laziness', isCorrect: true },
              { id: 'c', text: 'Always being busy with work', isCorrect: false }
            ]
          },
          {
            id: 'quiz-2',
            nodeType: 'quiz_question',
            text: 'What should the heart realize about Allah\'s blessings?',
            order: 2,
            options: [
              { id: 'a', text: 'They can all be counted', isCorrect: false },
              { id: 'b', text: 'They are endless and cannot be fully measured', isCorrect: true },
              { id: 'c', text: 'They are unimportant compared to sins', isCorrect: false }
            ]
          },
          {
            id: 'quiz-3',
            nodeType: 'quiz_question',
            text: 'What should a person do after recognizing their sins?',
            order: 3,
            options: [
              { id: 'a', text: 'Ignore them and move on', isCorrect: false },
              { id: 'b', text: 'Talk about them with others', isCorrect: false },
              { id: 'c', text: 'Hurry to fix them, leave them, and seek Allah\'s help', isCorrect: true }
            ]
          },
          {
            id: 'quiz-4',
            nodeType: 'quiz_question',
            text: 'How should you deal with time in this station?',
            order: 4,
            options: [
              { id: 'a', text: 'Spend it freely, without thinking', isCorrect: false },
              { id: 'b', text: 'Guard it, make up for missed chances, and use what remains well', isCorrect: true },
              { id: 'c', text: 'Only focus on the future, not the past', isCorrect: false }
            ]
          }
        ]
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: 'Actions',
        description: 'Application Phase - Put your learning into practice',
        content: [
          {
            id: 'action-part-1',
            nodeType: 'action_part',
            text: 'Part One (Blessings):',
            children: [
              {
                id: 'action-1',
                nodeType: 'action_item',
                text: 'Write down one blessing you noticed today.',
                order: 1
              },
              {
                id: 'action-2',
                nodeType: 'action_item',
                text: 'Say "Alhamdulillāh" three times with focus.',
                order: 2
              },
              {
                id: 'action-3',
                nodeType: 'action_item',
                text: 'Ask Allah\'s forgiveness for not being thankful enough.',
                order: 3
              }
            ],
            order: 1
          },
          {
            id: 'action-part-2',
            nodeType: 'action_part',
            text: 'Part Two (Sins):',
            children: [
              {
                id: 'action-4',
                nodeType: 'action_item',
                text: 'Write down one mistake you made today.',
                order: 1
              },
              {
                id: 'action-5',
                nodeType: 'action_item',
                text: 'Say "Astaghfirullāh" five times and make du\'ā to leave the sin.',
                order: 2
              },
              {
                id: 'action-6',
                nodeType: 'action_item',
                text: 'Think of one step you can take tomorrow to avoid repeating it.',
                order: 3
              }
            ],
            order: 2
          },
          {
            id: 'action-part-3',
            nodeType: 'action_part',
            text: 'Part Three (Time):',
            children: [
              {
                id: 'action-7',
                nodeType: 'action_item',
                text: 'At the end of the day, list one gain and one loss in how you spent your time.',
                order: 1
              },
              {
                id: 'action-8',
                nodeType: 'action_item',
                text: 'Identify one activity that wastes your time and limit it tomorrow.',
                order: 2
              },
              {
                id: 'action-9',
                nodeType: 'action_item',
                text: 'Do one positive action today to make up for a missed opportunity.',
                order: 3
              }
            ],
            order: 3
          }
        ]
      },
      {
        id: 'step-5',
        stepNumber: 5,
        title: 'Completion',
        description: 'Reflection & Closing - Complete your journey',
        content: [
          {
            id: 'quran-2',
            nodeType: 'quran',
            text: '"By time, surely mankind is in loss, except those who believe, do good deeds, and encourage each other to truth and patience." (Sūrah al-\'Asr, 103:1-3)',
            order: 1
          },
          {
            id: 'closing',
            nodeType: 'closing',
            text: 'Wakefulness is the first step on the journey. Every day is a chance to open your eyes, see Allah\'s blessings, leave behind sins, and use your time well. Even small steps count — keep going, and Allah will guide your heart closer to Him.',
            order: 2
          }
        ]
      }
    ]
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stationId = params.id;
    
    // Mock database query
    const station = mockStationData[stationId as keyof typeof mockStationData];
    
    if (!station) {
      return NextResponse.json(
        { error: 'Station not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(station);
  } catch (error) {
    console.error('Error fetching station:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

