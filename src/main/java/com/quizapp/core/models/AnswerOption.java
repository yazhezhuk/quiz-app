package com.quizapp.core.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity(name = "answer_option")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnswerOption {

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @Column
    @Nationalized
    private String text;

    @Column
    private double pointsIfCorrect;
}

